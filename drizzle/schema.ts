import { bigint, boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Wallet profiles - stores wallet addresses and their associated rewards data
 * This is the main table for the rewards system, keyed by wallet address
 */
export const walletProfiles = mysqlTable("wallet_profiles", {
  id: int("id").autoincrement().primaryKey(),
  /** Wallet address (EVM, Tron, or Solana format) */
  walletAddress: varchar("walletAddress", { length: 128 }).notNull().unique(),
  /** Chain type: evm, tron, solana */
  chainType: mysqlEnum("chainType", ["evm", "tron", "solana"]).notNull(),
  /** Total accumulated points */
  totalPoints: int("totalPoints").default(0).notNull(),
  /** Whether the initial connect bonus has been claimed */
  connectBonusClaimed: boolean("connectBonusClaimed").default(false).notNull(),
  /** X (Twitter) connection status */
  xConnected: boolean("xConnected").default(false).notNull(),
  xUsername: varchar("xUsername", { length: 64 }),
  xConnectedAt: timestamp("xConnectedAt"),
  /** Discord connection status */
  discordConnected: boolean("discordConnected").default(false).notNull(),
  discordUsername: varchar("discordUsername", { length: 64 }),
  discordConnectedAt: timestamp("discordConnectedAt"),
  /** Referral tracking */
  referralCode: varchar("referralCode", { length: 16 }).unique(),
  referredBy: varchar("referredBy", { length: 16 }),
  /** Timestamps */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WalletProfile = typeof walletProfiles.$inferSelect;
export type InsertWalletProfile = typeof walletProfiles.$inferInsert;

/**
 * Task completions - tracks individual task completions for each wallet
 * Used for daily tasks and one-time tasks
 */
export const taskCompletions = mysqlTable("task_completions", {
  id: int("id").autoincrement().primaryKey(),
  /** Reference to wallet profile */
  walletAddress: varchar("walletAddress", { length: 128 }).notNull(),
  /** Task type identifier */
  taskType: varchar("taskType", { length: 64 }).notNull(),
  /** Points awarded for this completion */
  pointsAwarded: int("pointsAwarded").notNull(),
  /** For daily tasks: the JST date (YYYY-MM-DD) this was completed */
  completionDate: varchar("completionDate", { length: 10 }),
  /** Additional metadata (e.g., tweet URL for X post tasks) */
  metadata: text("metadata"),
  /** Completion timestamp */
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

export type TaskCompletion = typeof taskCompletions.$inferSelect;
export type InsertTaskCompletion = typeof taskCompletions.$inferInsert;

/**
 * Points history - detailed log of all point transactions
 * Useful for auditing and displaying history to users
 */
export const pointsHistory = mysqlTable("points_history", {
  id: int("id").autoincrement().primaryKey(),
  walletAddress: varchar("walletAddress", { length: 128 }).notNull(),
  /** Type of transaction */
  transactionType: mysqlEnum("transactionType", [
    "connect_bonus",
    "x_connect",
    "discord_connect",
    "daily_post",
    "referral_bonus",
    "other"
  ]).notNull(),
  /** Points change (positive for earning, negative for spending) */
  pointsChange: int("pointsChange").notNull(),
  /** Running total after this transaction */
  balanceAfter: int("balanceAfter").notNull(),
  /** Description of the transaction */
  description: text("description"),
  /** Timestamp */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PointsHistory = typeof pointsHistory.$inferSelect;
export type InsertPointsHistory = typeof pointsHistory.$inferInsert;
