import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 */

export const roleEnum = pgEnum("role", ["user", "admin"]);
export const chainTypeEnum = pgEnum("chain_type", ["evm", "tron", "solana"]);
export const transactionTypeEnum = pgEnum("transaction_type", [
  "connect_bonus",
  "x_connect",
  "x_disconnect",
  "discord_connect",
  "discord_disconnect",
  "daily_post",
  "referral_bonus",
  "admin_adjustment",
  "other"
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  /** Wallet address as primary identifier */
  walletAddress: varchar("wallet_address", { length: 128 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastSignedIn: timestamp("last_signed_in").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Wallet profiles - stores wallet addresses and their associated rewards data
 * This is the main table for the rewards system, keyed by wallet address
 */
export const walletProfiles = pgTable("wallet_profiles", {
  id: serial("id").primaryKey(),
  /** Wallet address (EVM, Tron, or Solana format) */
  walletAddress: varchar("wallet_address", { length: 128 }).notNull().unique(),
  /** Chain type: evm, tron, solana */
  chainType: chainTypeEnum("chain_type").notNull(),
  /** Total accumulated points */
  totalPoints: integer("total_points").default(0).notNull(),
  /** Whether the initial connect bonus has been claimed */
  connectBonusClaimed: boolean("connect_bonus_claimed").default(false).notNull(),
  /** X (Twitter) connection status */
  xConnected: boolean("x_connected").default(false).notNull(),
  xUsername: varchar("x_username", { length: 64 }),
  xConnectedAt: timestamp("x_connected_at"),
  /** Discord connection status */
  discordConnected: boolean("discord_connected").default(false).notNull(),
  discordUsername: varchar("discord_username", { length: 64 }),
  discordConnectedAt: timestamp("discord_connected_at"),
  /** Referral tracking */
  referralCode: varchar("referral_code", { length: 16 }).unique(),
  referredBy: varchar("referred_by", { length: 16 }),
  /** Timestamps */
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type WalletProfile = typeof walletProfiles.$inferSelect;
export type InsertWalletProfile = typeof walletProfiles.$inferInsert;

/**
 * Task completions - tracks individual task completions for each wallet
 * Used for daily tasks and one-time tasks
 */
export const taskCompletions = pgTable("task_completions", {
  id: serial("id").primaryKey(),
  /** Reference to wallet profile */
  walletAddress: varchar("wallet_address", { length: 128 }).notNull(),
  /** Task type identifier */
  taskType: varchar("task_type", { length: 64 }).notNull(),
  /** Points awarded for this completion */
  pointsAwarded: integer("points_awarded").notNull(),
  /** For daily tasks: the UTC date (YYYY-MM-DD) this was completed */
  completionDate: varchar("completion_date", { length: 10 }),
  /** Additional metadata (e.g., tweet URL for X post tasks) */
  metadata: text("metadata"),
  /** Completion timestamp */
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export type TaskCompletion = typeof taskCompletions.$inferSelect;
export type InsertTaskCompletion = typeof taskCompletions.$inferInsert;

/**
 * Points history - detailed log of all point transactions
 * Useful for auditing and displaying history to users
 */
export const pointsHistory = pgTable("points_history", {
  id: serial("id").primaryKey(),
  walletAddress: varchar("wallet_address", { length: 128 }).notNull(),
  /** Type of transaction */
  transactionType: transactionTypeEnum("transaction_type").notNull(),
  /** Points change (positive for earning, negative for spending) */
  pointsChange: integer("points_change").notNull(),
  /** Running total after this transaction */
  balanceAfter: integer("balance_after").notNull(),
  /** Description of the transaction */
  description: text("description"),
  /** Timestamp */
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PointsHistory = typeof pointsHistory.$inferSelect;
export type InsertPointsHistory = typeof pointsHistory.$inferInsert;
