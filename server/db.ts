import { and, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { nanoid } from "nanoid";
import { 
  InsertUser, 
  users, 
  walletProfiles, 
  taskCompletions, 
  pointsHistory,
  InsertWalletProfile,
  InsertTaskCompletion,
  InsertPointsHistory
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================
// Rewards System Queries
// ============================================

/**
 * Get or create a wallet profile
 */
export async function getOrCreateWalletProfile(
  walletAddress: string, 
  chainType: "evm" | "tron" | "solana"
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Try to find existing profile
  const existing = await db
    .select()
    .from(walletProfiles)
    .where(eq(walletProfiles.walletAddress, walletAddress))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  // Create new profile with referral code
  const referralCode = nanoid(8).toUpperCase();
  
  await db.insert(walletProfiles).values({
    walletAddress,
    chainType,
    referralCode,
    totalPoints: 0,
    connectBonusClaimed: false,
    xConnected: false,
    discordConnected: false,
  });

  const newProfile = await db
    .select()
    .from(walletProfiles)
    .where(eq(walletProfiles.walletAddress, walletAddress))
    .limit(1);

  return newProfile[0];
}

/**
 * Get wallet profile by address
 */
export async function getWalletProfile(walletAddress: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(walletProfiles)
    .where(eq(walletProfiles.walletAddress, walletAddress))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Claim connect bonus (300 points)
 */
export async function claimConnectBonus(walletAddress: string): Promise<{ success: boolean; points: number; message: string }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, points: 0, message: "Wallet profile not found" };
  }

  if (profile.connectBonusClaimed) {
    return { success: false, points: profile.totalPoints, message: "Connect bonus already claimed" };
  }

  const bonusPoints = 300;
  const newTotal = profile.totalPoints + bonusPoints;

  // Update profile
  await db
    .update(walletProfiles)
    .set({
      connectBonusClaimed: true,
      totalPoints: newTotal,
    })
    .where(eq(walletProfiles.walletAddress, walletAddress));

  // Record in history
  await db.insert(pointsHistory).values({
    walletAddress,
    transactionType: "connect_bonus",
    pointsChange: bonusPoints,
    balanceAfter: newTotal,
    description: "Initial wallet connection bonus",
  });

  return { success: true, points: newTotal, message: "Connect bonus claimed!" };
}

/**
 * Connect X (Twitter) account
 */
export async function connectXAccount(
  walletAddress: string, 
  xUsername: string
): Promise<{ success: boolean; points: number; message: string }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, points: 0, message: "Wallet profile not found" };
  }

  if (profile.xConnected) {
    return { success: false, points: profile.totalPoints, message: "X account already connected" };
  }

  const bonusPoints = 100;
  const newTotal = profile.totalPoints + bonusPoints;

  // Update profile
  await db
    .update(walletProfiles)
    .set({
      xConnected: true,
      xUsername,
      xConnectedAt: new Date(),
      totalPoints: newTotal,
    })
    .where(eq(walletProfiles.walletAddress, walletAddress));

  // Record in history
  await db.insert(pointsHistory).values({
    walletAddress,
    transactionType: "x_connect",
    pointsChange: bonusPoints,
    balanceAfter: newTotal,
    description: `Connected X account: @${xUsername}`,
  });

  return { success: true, points: newTotal, message: "X account connected!" };
}

/**
 * Disconnect X account
 */
export async function disconnectXAccount(walletAddress: string): Promise<{ success: boolean; message: string }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(walletProfiles)
    .set({
      xConnected: false,
      xUsername: null,
      xConnectedAt: null,
    })
    .where(eq(walletProfiles.walletAddress, walletAddress));

  return { success: true, message: "X account disconnected" };
}

/**
 * Connect Discord account
 */
export async function connectDiscordAccount(
  walletAddress: string, 
  discordUsername: string
): Promise<{ success: boolean; points: number; message: string }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, points: 0, message: "Wallet profile not found" };
  }

  if (profile.discordConnected) {
    return { success: false, points: profile.totalPoints, message: "Discord account already connected" };
  }

  const bonusPoints = 100;
  const newTotal = profile.totalPoints + bonusPoints;

  // Update profile
  await db
    .update(walletProfiles)
    .set({
      discordConnected: true,
      discordUsername,
      discordConnectedAt: new Date(),
      totalPoints: newTotal,
    })
    .where(eq(walletProfiles.walletAddress, walletAddress));

  // Record in history
  await db.insert(pointsHistory).values({
    walletAddress,
    transactionType: "discord_connect",
    pointsChange: bonusPoints,
    balanceAfter: newTotal,
    description: `Connected Discord account: ${discordUsername}`,
  });

  return { success: true, points: newTotal, message: "Discord account connected!" };
}

/**
 * Disconnect Discord account
 */
export async function disconnectDiscordAccount(walletAddress: string): Promise<{ success: boolean; message: string }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(walletProfiles)
    .set({
      discordConnected: false,
      discordUsername: null,
      discordConnectedAt: null,
    })
    .where(eq(walletProfiles.walletAddress, walletAddress));

  return { success: true, message: "Discord account disconnected" };
}

/**
 * Get current JST date string (YYYY-MM-DD)
 */
export function getJSTDateString(): string {
  const now = new Date();
  // JST is UTC+9
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstDate = new Date(now.getTime() + jstOffset);
  return jstDate.toISOString().split('T')[0];
}

/**
 * Check if daily post task is completed for today (JST)
 */
export async function isDailyPostCompleted(walletAddress: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const todayJST = getJSTDateString();

  const result = await db
    .select()
    .from(taskCompletions)
    .where(
      and(
        eq(taskCompletions.walletAddress, walletAddress),
        eq(taskCompletions.taskType, "daily_post"),
        eq(taskCompletions.completionDate, todayJST)
      )
    )
    .limit(1);

  return result.length > 0;
}

/**
 * Complete daily post task
 */
export async function completeDailyPost(
  walletAddress: string,
  tweetUrl?: string
): Promise<{ success: boolean; points: number; message: string }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, points: 0, message: "Wallet profile not found" };
  }

  if (!profile.xConnected) {
    return { success: false, points: profile.totalPoints, message: "X account not connected" };
  }

  const todayJST = getJSTDateString();
  const alreadyCompleted = await isDailyPostCompleted(walletAddress);

  if (alreadyCompleted) {
    return { success: false, points: profile.totalPoints, message: "Daily post already completed today" };
  }

  const bonusPoints = 100;
  const newTotal = profile.totalPoints + bonusPoints;

  // Update profile points
  await db
    .update(walletProfiles)
    .set({ totalPoints: newTotal })
    .where(eq(walletProfiles.walletAddress, walletAddress));

  // Record task completion
  await db.insert(taskCompletions).values({
    walletAddress,
    taskType: "daily_post",
    pointsAwarded: bonusPoints,
    completionDate: todayJST,
    metadata: tweetUrl ? JSON.stringify({ tweetUrl }) : null,
  });

  // Record in history
  await db.insert(pointsHistory).values({
    walletAddress,
    transactionType: "daily_post",
    pointsChange: bonusPoints,
    balanceAfter: newTotal,
    description: `Daily X post completed (${todayJST})`,
  });

  return { success: true, points: newTotal, message: "Daily post completed!" };
}

/**
 * Get points history for a wallet
 */
export async function getPointsHistory(walletAddress: string, limit = 50) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(pointsHistory)
    .where(eq(pointsHistory.walletAddress, walletAddress))
    .orderBy(sql`${pointsHistory.createdAt} DESC`)
    .limit(limit);

  return result;
}

/**
 * Get all task completions for a wallet
 */
export async function getTaskCompletions(walletAddress: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(taskCompletions)
    .where(eq(taskCompletions.walletAddress, walletAddress))
    .orderBy(sql`${taskCompletions.completedAt} DESC`);

  return result;
}


// ============================================
// Admin Functions
// ============================================

/**
 * Get all wallet profiles with pagination
 */
export async function getAllWalletProfiles(
  page = 1,
  limit = 50,
  sortBy: "totalPoints" | "createdAt" = "createdAt",
  sortOrder: "asc" | "desc" = "desc"
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const offset = (page - 1) * limit;

  // Get total count
  const countResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(walletProfiles);
  const totalCount = countResult[0]?.count || 0;

  // Get profiles with sorting
  const orderColumn = sortBy === "totalPoints" 
    ? walletProfiles.totalPoints 
    : walletProfiles.createdAt;
  
  const profiles = await db
    .select()
    .from(walletProfiles)
    .orderBy(sortOrder === "desc" ? sql`${orderColumn} DESC` : sql`${orderColumn} ASC`)
    .limit(limit)
    .offset(offset);

  return {
    profiles,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
}

/**
 * Get admin dashboard statistics
 */
export async function getAdminStats() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Total users
  const userCountResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(walletProfiles);
  const totalUsers = userCountResult[0]?.count || 0;

  // Total points distributed
  const pointsResult = await db
    .select({ total: sql<number>`SUM(totalPoints)` })
    .from(walletProfiles);
  const totalPointsDistributed = pointsResult[0]?.total || 0;

  // X connected count
  const xConnectedResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(walletProfiles)
    .where(eq(walletProfiles.xConnected, true));
  const xConnectedCount = xConnectedResult[0]?.count || 0;

  // Discord connected count
  const discordConnectedResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(walletProfiles)
    .where(eq(walletProfiles.discordConnected, true));
  const discordConnectedCount = discordConnectedResult[0]?.count || 0;

  // Today's task completions (JST)
  const todayJST = getJSTDateString();
  const todayTasksResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(taskCompletions)
    .where(eq(taskCompletions.completionDate, todayJST));
  const todayTaskCompletions = todayTasksResult[0]?.count || 0;

  // Users by chain type
  const chainStatsResult = await db
    .select({
      chainType: walletProfiles.chainType,
      count: sql<number>`COUNT(*)`,
    })
    .from(walletProfiles)
    .groupBy(walletProfiles.chainType);

  const chainStats = chainStatsResult.reduce((acc, row) => {
    acc[row.chainType] = row.count;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalUsers,
    totalPointsDistributed,
    xConnectedCount,
    discordConnectedCount,
    todayTaskCompletions,
    chainStats,
    todayJST,
  };
}

/**
 * Search wallet profiles by address or username
 */
export async function searchWalletProfiles(query: string, limit = 20) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const searchPattern = `%${query}%`;

  const profiles = await db
    .select()
    .from(walletProfiles)
    .where(
      sql`${walletProfiles.walletAddress} LIKE ${searchPattern} 
          OR ${walletProfiles.xUsername} LIKE ${searchPattern} 
          OR ${walletProfiles.discordUsername} LIKE ${searchPattern}`
    )
    .limit(limit);

  return profiles;
}

/**
 * Manually adjust user points (admin only)
 */
export async function adjustUserPoints(
  walletAddress: string,
  pointsChange: number,
  reason: string
): Promise<{ success: boolean; newTotal: number; message: string }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, newTotal: 0, message: "Wallet profile not found" };
  }

  const newTotal = Math.max(0, profile.totalPoints + pointsChange);

  // Update profile
  await db
    .update(walletProfiles)
    .set({ totalPoints: newTotal })
    .where(eq(walletProfiles.walletAddress, walletAddress));

  // Record in history
  await db.insert(pointsHistory).values({
    walletAddress,
    transactionType: "admin_adjustment",
    pointsChange,
    balanceAfter: newTotal,
    description: `Admin adjustment: ${reason}`,
  });

  return { 
    success: true, 
    newTotal, 
    message: `Points adjusted by ${pointsChange}. New total: ${newTotal}` 
  };
}
