import { and, eq, sql, inArray } from "drizzle-orm";
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
 * Disconnect X account - resets ALL points to 0
 */
export async function disconnectXAccount(walletAddress: string): Promise<{ success: boolean; points: number; message: string }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, points: 0, message: "Wallet profile not found" };
  }

  const previousPoints = profile.totalPoints;

  // Reset all points to 0 and disconnect X
  await db
    .update(walletProfiles)
    .set({
      xConnected: false,
      xUsername: null,
      xConnectedAt: null,
      totalPoints: 0,
    })
    .where(eq(walletProfiles.walletAddress, walletAddress));

  // Record point loss in history
  if (previousPoints > 0) {
    await db.insert(pointsHistory).values({
      walletAddress,
      transactionType: "x_disconnect",
      pointsChange: -previousPoints,
      balanceAfter: 0,
      description: "Points reset due to X account disconnection",
    });
  }

  return { success: true, points: 0, message: "X account disconnected. All points have been reset." };
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
 * Disconnect Discord account - resets ALL points to 0
 */
export async function disconnectDiscordAccount(walletAddress: string): Promise<{ success: boolean; points: number; message: string }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const profile = await getWalletProfile(walletAddress);
  if (!profile) {
    return { success: false, points: 0, message: "Wallet profile not found" };
  }

  const previousPoints = profile.totalPoints;

  // Reset all points to 0 and disconnect Discord
  await db
    .update(walletProfiles)
    .set({
      discordConnected: false,
      discordUsername: null,
      discordConnectedAt: null,
      totalPoints: 0,
    })
    .where(eq(walletProfiles.walletAddress, walletAddress));

  // Record point loss in history
  if (previousPoints > 0) {
    await db.insert(pointsHistory).values({
      walletAddress,
      transactionType: "discord_disconnect",
      pointsChange: -previousPoints,
      balanceAfter: 0,
      description: "Points reset due to Discord account disconnection",
    });
  }

  return { success: true, points: 0, message: "Discord account disconnected. All points have been reset." };
}

/**
 * Get current UTC date string (YYYY-MM-DD)
 * Daily tasks reset at 00:00 UTC
 */
export function getUTCDateString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * @deprecated Use getUTCDateString instead - kept for backward compatibility
 */
export function getJSTDateString(): string {
  return getUTCDateString();
}

/**
 * Check if daily post task is completed for today (UTC)
 * Resets at 00:00 UTC
 */
export async function isDailyPostCompleted(walletAddress: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const todayUTC = getUTCDateString();

  const result = await db
    .select()
    .from(taskCompletions)
    .where(
      and(
        eq(taskCompletions.walletAddress, walletAddress),
        eq(taskCompletions.taskType, "daily_post"),
        eq(taskCompletions.completionDate, todayUTC)
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

  const todayUTC = getUTCDateString();
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
    completionDate: todayUTC,
    metadata: tweetUrl ? JSON.stringify({ tweetUrl }) : null,
  });

  // Record in history
  await db.insert(pointsHistory).values({
    walletAddress,
    transactionType: "daily_post",
    pointsChange: bonusPoints,
    balanceAfter: newTotal,
    description: `Daily X post completed (${todayUTC} UTC)`,
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
 * Get all wallet profiles with pagination (includes daily task count)
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

  // Get daily task completion counts for each profile
  const walletAddresses = profiles.map(p => p.walletAddress);
  const dailyTaskCounts: Record<string, number> = {};
  
  if (walletAddresses.length > 0) {
    const taskCounts = await db
      .select({
        walletAddress: taskCompletions.walletAddress,
        count: sql<number>`COUNT(*)`
      })
      .from(taskCompletions)
      .where(and(
        inArray(taskCompletions.walletAddress, walletAddresses),
        eq(taskCompletions.taskType, 'daily_post')
      ))
      .groupBy(taskCompletions.walletAddress);
    
    taskCounts.forEach(tc => {
      dailyTaskCounts[tc.walletAddress] = tc.count;
    });
  }

  // Add daily task count to each profile
  const profilesWithTaskCount = profiles.map(p => ({
    ...p,
    dailyTaskCount: dailyTaskCounts[p.walletAddress] || 0
  }));

  return {
    profiles: profilesWithTaskCount,
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

  // Today's task completions (UTC)
  const todayUTC = getUTCDateString();
  const todayTasksResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(taskCompletions)
    .where(eq(taskCompletions.completionDate, todayUTC));
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
    todayUTC,
  };
}

/**
 * Get user activity statistics for graphs (daily/weekly/monthly/yearly/all-time)
 */
export async function getUserActivityStats() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const now = new Date();
  
  // Helper to get date string N days ago
  const getDateNDaysAgo = (days: number) => {
    const date = new Date(now);
    date.setUTCDate(date.getUTCDate() - days);
    return date.toISOString().split('T')[0];
  };

  // Get daily stats for the past 30 days (for daily/weekly/monthly views)
  const dailyStats = await db
    .select({
      date: sql<string>`DATE(createdAt)`,
      newUsers: sql<number>`COUNT(*)`
    })
    .from(walletProfiles)
    .where(sql`createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)`)
    .groupBy(sql`DATE(createdAt)`)
    .orderBy(sql`DATE(createdAt) ASC`);

  // Get daily task completions for the past 30 days
  const dailyTaskStats = await db
    .select({
      date: taskCompletions.completionDate,
      completions: sql<number>`COUNT(DISTINCT walletAddress)`
    })
    .from(taskCompletions)
    .where(sql`completionDate >= ${getDateNDaysAgo(30)}`)
    .groupBy(taskCompletions.completionDate)
    .orderBy(sql`completionDate ASC`);

  // Get monthly stats for the past 12 months (for yearly view)
  const monthlyStats = await db
    .select({
      month: sql<string>`DATE_FORMAT(createdAt, '%Y-%m')`,
      newUsers: sql<number>`COUNT(*)`
    })
    .from(walletProfiles)
    .where(sql`createdAt >= DATE_SUB(NOW(), INTERVAL 12 MONTH)`)
    .groupBy(sql`DATE_FORMAT(createdAt, '%Y-%m')`)
    .orderBy(sql`DATE_FORMAT(createdAt, '%Y-%m') ASC`);

  // Get monthly task completions for the past 12 months
  const monthlyTaskStats = await db
    .select({
      month: sql<string>`DATE_FORMAT(completedAt, '%Y-%m')`,
      completions: sql<number>`COUNT(DISTINCT walletAddress)`
    })
    .from(taskCompletions)
    .where(sql`completedAt >= DATE_SUB(NOW(), INTERVAL 12 MONTH)`)
    .groupBy(sql`DATE_FORMAT(completedAt, '%Y-%m')`)
    .orderBy(sql`DATE_FORMAT(completedAt, '%Y-%m') ASC`);

  // All-time cumulative stats
  const allTimeStats = await db
    .select({
      totalUsers: sql<number>`COUNT(*)`,
      totalTaskCompletions: sql<number>`(SELECT COUNT(DISTINCT walletAddress) FROM task_completions)`
    })
    .from(walletProfiles);

  return {
    daily: {
      users: dailyStats,
      tasks: dailyTaskStats
    },
    monthly: {
      users: monthlyStats,
      tasks: monthlyTaskStats
    },
    allTime: allTimeStats[0] || { totalUsers: 0, totalTaskCompletions: 0 }
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
/**
 * Get daily post completions with tweet URLs for admin verification
 */
export async function getDailyPostCompletions(
  page = 1,
  limit = 50
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const offset = (page - 1) * limit;

  // Get total count
  const countResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(taskCompletions)
    .where(eq(taskCompletions.taskType, "daily_post"));
  const totalCount = countResult[0]?.count || 0;

  // Get completions with wallet profile info
  const completions = await db
    .select({
      id: taskCompletions.id,
      walletAddress: taskCompletions.walletAddress,
      pointsAwarded: taskCompletions.pointsAwarded,
      completionDate: taskCompletions.completionDate,
      metadata: taskCompletions.metadata,
      completedAt: taskCompletions.completedAt,
      xUsername: walletProfiles.xUsername,
    })
    .from(taskCompletions)
    .leftJoin(walletProfiles, eq(taskCompletions.walletAddress, walletProfiles.walletAddress))
    .where(eq(taskCompletions.taskType, "daily_post"))
    .orderBy(sql`${taskCompletions.completedAt} DESC`)
    .limit(limit)
    .offset(offset);

  // Parse metadata to extract tweet URLs
  const parsedCompletions = completions.map(c => {
    let tweetUrl = null;
    if (c.metadata) {
      try {
        const meta = JSON.parse(c.metadata);
        tweetUrl = meta.tweetUrl || null;
      } catch (e) {
        // Ignore parse errors
      }
    }
    return {
      ...c,
      tweetUrl,
    };
  });

  return {
    completions: parsedCompletions,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
}

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
