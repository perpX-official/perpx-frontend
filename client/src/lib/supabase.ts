import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client for frontend use
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions matching the database schema
export interface WalletProfile {
  id: number;
  wallet_address: string;
  chain_type: 'evm' | 'tron' | 'solana';
  total_points: number;
  connect_bonus_claimed: boolean;
  x_connected: boolean;
  x_username: string | null;
  x_connected_at: string | null;
  discord_connected: boolean;
  discord_username: string | null;
  discord_connected_at: string | null;
  referral_code: string | null;
  referred_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskCompletion {
  id: number;
  wallet_address: string;
  task_type: string;
  points_awarded: number;
  completion_date: string | null;
  metadata: string | null;
  completed_at: string;
}

export interface PointsHistory {
  id: number;
  wallet_address: string;
  transaction_type: string;
  points_change: number;
  balance_after: number;
  description: string | null;
  created_at: string;
}

// Helper function to generate referral code
function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Get UTC date string (YYYY-MM-DD)
function getUTCDateString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// ============================================
// Rewards API Functions (Direct Supabase Access)
// ============================================

/**
 * Get or create a wallet profile
 */
export async function getOrCreateWalletProfile(
  walletAddress: string,
  chainType: 'evm' | 'tron' | 'solana'
): Promise<WalletProfile | null> {
  // Try to find existing profile
  const { data: existing, error: selectError } = await supabase
    .from('wallet_profiles')
    .select('*')
    .eq('wallet_address', walletAddress)
    .limit(1)
    .single();

  if (existing) {
    return existing as WalletProfile;
  }

  // Create new profile
  const referralCode = generateReferralCode();
  const { data: newProfile, error: insertError } = await supabase
    .from('wallet_profiles')
    .insert({
      wallet_address: walletAddress,
      chain_type: chainType,
      referral_code: referralCode,
      total_points: 0,
      connect_bonus_claimed: false,
      x_connected: false,
      discord_connected: false,
    })
    .select()
    .single();

  if (insertError) {
    console.error('Error creating wallet profile:', insertError);
    return null;
  }

  return newProfile as WalletProfile;
}

/**
 * Get wallet profile by address
 */
export async function getWalletProfile(walletAddress: string): Promise<WalletProfile | null> {
  const { data, error } = await supabase
    .from('wallet_profiles')
    .select('*')
    .eq('wallet_address', walletAddress)
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching wallet profile:', error);
    return null;
  }

  return data as WalletProfile;
}

/**
 * Claim connect bonus (300 points)
 */
export async function claimConnectBonus(walletAddress: string): Promise<{ success: boolean; points: number; message: string }> {
  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, points: 0, message: 'Wallet profile not found' };
  }

  if (profile.connect_bonus_claimed) {
    return { success: false, points: profile.total_points, message: 'Connect bonus already claimed' };
  }

  const bonusPoints = 300;
  const newTotal = profile.total_points + bonusPoints;

  // Update profile
  const { error: updateError } = await supabase
    .from('wallet_profiles')
    .update({
      connect_bonus_claimed: true,
      total_points: newTotal,
    })
    .eq('wallet_address', walletAddress);

  if (updateError) {
    console.error('Error claiming connect bonus:', updateError);
    return { success: false, points: profile.total_points, message: 'Failed to claim bonus' };
  }

  // Record in history
  await supabase.from('points_history').insert({
    wallet_address: walletAddress,
    transaction_type: 'connect_bonus',
    points_change: bonusPoints,
    balance_after: newTotal,
    description: 'Initial wallet connection bonus',
  });

  return { success: true, points: newTotal, message: 'Connect bonus claimed!' };
}

/**
 * Connect X (Twitter) account
 */
export async function connectXAccount(
  walletAddress: string,
  xUsername: string
): Promise<{ success: boolean; points: number; message: string }> {
  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, points: 0, message: 'Wallet profile not found' };
  }

  if (profile.x_connected) {
    return { success: false, points: profile.total_points, message: 'X account already connected' };
  }

  const bonusPoints = 100;
  const newTotal = profile.total_points + bonusPoints;

  // Update profile
  const { error: updateError } = await supabase
    .from('wallet_profiles')
    .update({
      x_connected: true,
      x_username: xUsername,
      x_connected_at: new Date().toISOString(),
      total_points: newTotal,
    })
    .eq('wallet_address', walletAddress);

  if (updateError) {
    console.error('Error connecting X account:', updateError);
    return { success: false, points: profile.total_points, message: 'Failed to connect X account' };
  }

  // Record in history
  await supabase.from('points_history').insert({
    wallet_address: walletAddress,
    transaction_type: 'x_connect',
    points_change: bonusPoints,
    balance_after: newTotal,
    description: `Connected X account: @${xUsername}`,
  });

  return { success: true, points: newTotal, message: 'X account connected!' };
}

/**
 * Disconnect X account
 */
export async function disconnectXAccount(walletAddress: string): Promise<{ success: boolean; points: number; message: string }> {
  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, points: 0, message: 'Wallet profile not found' };
  }

  const xConnectBonus = 100;
  const newTotal = Math.max(0, profile.total_points - xConnectBonus);

  // Update profile
  const { error: updateError } = await supabase
    .from('wallet_profiles')
    .update({
      x_connected: false,
      x_username: null,
      x_connected_at: null,
      total_points: newTotal,
    })
    .eq('wallet_address', walletAddress);

  if (updateError) {
    console.error('Error disconnecting X account:', updateError);
    return { success: false, points: profile.total_points, message: 'Failed to disconnect X account' };
  }

  // Record in history
  await supabase.from('points_history').insert({
    wallet_address: walletAddress,
    transaction_type: 'x_disconnect',
    points_change: -xConnectBonus,
    balance_after: newTotal,
    description: 'X connect bonus revoked due to account disconnection',
  });

  return { success: true, points: newTotal, message: 'X account disconnected. X connect bonus has been revoked.' };
}

/**
 * Connect Discord account
 */
export async function connectDiscordAccount(
  walletAddress: string,
  discordUsername: string
): Promise<{ success: boolean; points: number; message: string }> {
  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, points: 0, message: 'Wallet profile not found' };
  }

  if (profile.discord_connected) {
    return { success: false, points: profile.total_points, message: 'Discord account already connected' };
  }

  const bonusPoints = 100;
  const newTotal = profile.total_points + bonusPoints;

  // Update profile
  const { error: updateError } = await supabase
    .from('wallet_profiles')
    .update({
      discord_connected: true,
      discord_username: discordUsername,
      discord_connected_at: new Date().toISOString(),
      total_points: newTotal,
    })
    .eq('wallet_address', walletAddress);

  if (updateError) {
    console.error('Error connecting Discord account:', updateError);
    return { success: false, points: profile.total_points, message: 'Failed to connect Discord account' };
  }

  // Record in history
  await supabase.from('points_history').insert({
    wallet_address: walletAddress,
    transaction_type: 'discord_connect',
    points_change: bonusPoints,
    balance_after: newTotal,
    description: `Connected Discord account: ${discordUsername}`,
  });

  return { success: true, points: newTotal, message: 'Discord account connected!' };
}

/**
 * Disconnect Discord account
 */
export async function disconnectDiscordAccount(walletAddress: string): Promise<{ success: boolean; points: number; message: string }> {
  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, points: 0, message: 'Wallet profile not found' };
  }

  const discordConnectBonus = 100;
  const newTotal = Math.max(0, profile.total_points - discordConnectBonus);

  // Update profile
  const { error: updateError } = await supabase
    .from('wallet_profiles')
    .update({
      discord_connected: false,
      discord_username: null,
      discord_connected_at: null,
      total_points: newTotal,
    })
    .eq('wallet_address', walletAddress);

  if (updateError) {
    console.error('Error disconnecting Discord account:', updateError);
    return { success: false, points: profile.total_points, message: 'Failed to disconnect Discord account' };
  }

  // Record in history
  await supabase.from('points_history').insert({
    wallet_address: walletAddress,
    transaction_type: 'discord_disconnect',
    points_change: -discordConnectBonus,
    balance_after: newTotal,
    description: 'Discord connect bonus revoked due to account disconnection',
  });

  return { success: true, points: newTotal, message: 'Discord account disconnected. Discord connect bonus has been revoked.' };
}

/**
 * Check if daily post is completed for today
 */
export async function isDailyPostCompleted(walletAddress: string): Promise<boolean> {
  const today = getUTCDateString();
  
  const { data, error } = await supabase
    .from('task_completions')
    .select('id')
    .eq('wallet_address', walletAddress)
    .eq('task_type', 'daily_post')
    .eq('completion_date', today)
    .limit(1);

  if (error) {
    console.error('Error checking daily post:', error);
    return false;
  }

  return data && data.length > 0;
}

/**
 * Complete daily post task
 */
export async function completeDailyPost(
  walletAddress: string,
  tweetUrl: string
): Promise<{ success: boolean; points: number; message: string }> {
  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, points: 0, message: 'Wallet profile not found' };
  }

  if (!profile.x_connected) {
    return { success: false, points: profile.total_points, message: 'Please connect your X account first' };
  }

  const today = getUTCDateString();
  const alreadyCompleted = await isDailyPostCompleted(walletAddress);
  
  if (alreadyCompleted) {
    return { success: false, points: profile.total_points, message: 'Daily post already completed for today' };
  }

  const bonusPoints = 50;
  const newTotal = profile.total_points + bonusPoints;

  // Record task completion
  const { error: taskError } = await supabase.from('task_completions').insert({
    wallet_address: walletAddress,
    task_type: 'daily_post',
    points_awarded: bonusPoints,
    completion_date: today,
    metadata: JSON.stringify({ tweetUrl }),
  });

  if (taskError) {
    console.error('Error completing daily post:', taskError);
    return { success: false, points: profile.total_points, message: 'Failed to complete daily post' };
  }

  // Update profile points
  await supabase
    .from('wallet_profiles')
    .update({ total_points: newTotal })
    .eq('wallet_address', walletAddress);

  // Record in history
  await supabase.from('points_history').insert({
    wallet_address: walletAddress,
    transaction_type: 'daily_post',
    points_change: bonusPoints,
    balance_after: newTotal,
    description: `Daily X post completed`,
  });

  return { success: true, points: newTotal, message: 'Daily post completed! +50 points' };
}

/**
 * Get points history for a wallet
 */
export async function getPointsHistory(walletAddress: string, limit = 50): Promise<PointsHistory[]> {
  const { data, error } = await supabase
    .from('points_history')
    .select('*')
    .eq('wallet_address', walletAddress)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching points history:', error);
    return [];
  }

  return data as PointsHistory[];
}
