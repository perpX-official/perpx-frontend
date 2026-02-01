/**
 * Storage helpers for Supabase Storage
 * Replaces Manus storage proxy with Supabase Storage API
 */

import { createClient } from '@supabase/supabase-js';

// Supabase client for storage operations
let supabaseClient: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        "Supabase credentials missing: set SUPABASE_URL and SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY)"
      );
    }
    
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
}

const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'uploads';

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

/**
 * Upload a file to Supabase Storage
 */
export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  const supabase = getSupabaseClient();
  const key = normalizeKey(relKey);
  
  // Convert string to Uint8Array if needed
  const fileData = typeof data === 'string' 
    ? new TextEncoder().encode(data) 
    : data;
  
  const { data: uploadData, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(key, fileData, {
      contentType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(key);

  return { 
    key, 
    url: urlData.publicUrl 
  };
}

/**
 * Get a file URL from Supabase Storage
 */
export async function storageGet(
  relKey: string,
  expiresIn = 3600
): Promise<{ key: string; url: string }> {
  const supabase = getSupabaseClient();
  const key = normalizeKey(relKey);
  
  // Try to get public URL first
  const { data: publicUrlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(key);

  // If bucket is private, create signed URL
  if (!publicUrlData.publicUrl) {
    const { data: signedUrlData, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(key, expiresIn);

    if (error) {
      throw new Error(`Failed to get storage URL: ${error.message}`);
    }

    return { key, url: signedUrlData.signedUrl };
  }

  return { key, url: publicUrlData.publicUrl };
}

/**
 * Delete a file from Supabase Storage
 */
export async function storageDelete(relKey: string): Promise<void> {
  const supabase = getSupabaseClient();
  const key = normalizeKey(relKey);
  
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([key]);

  if (error) {
    throw new Error(`Storage delete failed: ${error.message}`);
  }
}

/**
 * List files in a directory
 */
export async function storageList(
  prefix: string,
  limit = 100
): Promise<{ name: string; url: string }[]> {
  const supabase = getSupabaseClient();
  const normalizedPrefix = normalizeKey(prefix);
  
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .list(normalizedPrefix, { limit });

  if (error) {
    throw new Error(`Storage list failed: ${error.message}`);
  }

  return (data || []).map(file => {
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(`${normalizedPrefix}/${file.name}`);
    
    return {
      name: file.name,
      url: urlData.publicUrl,
    };
  });
}
