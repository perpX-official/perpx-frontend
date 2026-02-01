import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getOrCreateWalletProfile,
  getWalletProfile,
  claimConnectBonus,
  connectXAccount,
  disconnectXAccount,
  connectDiscordAccount,
  disconnectDiscordAccount,
  completeDailyPost,
  isDailyPostCompleted,
  getPointsHistory,
  getUTCDateString,
  getAllWalletProfiles,
  getAdminStats,
  searchWalletProfiles,
  adjustUserPoints,
  getDailyPostCompletions,
  getUserActivityStats,
} from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Rewards System API
  rewards: router({
    // Get or create wallet profile (called on wallet connect)
    getProfile: publicProcedure
      .input(z.object({
        walletAddress: z.string().min(1),
        chainType: z.enum(["evm", "tron", "solana"]),
      }))
      .query(async ({ input }) => {
        const profile = await getOrCreateWalletProfile(input.walletAddress, input.chainType);
        const dailyPostCompleted = profile.xConnected 
          ? await isDailyPostCompleted(input.walletAddress)
          : false;
        const todayUTC = getUTCDateString();
        
        return {
          ...profile,
          dailyPostCompleted,
          todayUTC,
        };
      }),

    // Claim connect bonus (300 points)
    claimConnectBonus: publicProcedure
      .input(z.object({
        walletAddress: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        return await claimConnectBonus(input.walletAddress);
      }),

    // Connect X (Twitter) account
    connectX: publicProcedure
      .input(z.object({
        walletAddress: z.string().min(1),
        xUsername: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        return await connectXAccount(input.walletAddress, input.xUsername);
      }),

    // Disconnect X account
    disconnectX: publicProcedure
      .input(z.object({
        walletAddress: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        return await disconnectXAccount(input.walletAddress);
      }),

    // Connect Discord account
    connectDiscord: publicProcedure
      .input(z.object({
        walletAddress: z.string().min(1),
        discordUsername: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        return await connectDiscordAccount(input.walletAddress, input.discordUsername);
      }),

    // Disconnect Discord account
    disconnectDiscord: publicProcedure
      .input(z.object({
        walletAddress: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        return await disconnectDiscordAccount(input.walletAddress);
      }),

    // Complete daily post task
    completeDailyPost: publicProcedure
      .input(z.object({
        walletAddress: z.string().min(1),
        tweetUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await completeDailyPost(input.walletAddress, input.tweetUrl);
      }),

    // Get points history
    getHistory: publicProcedure
      .input(z.object({
        walletAddress: z.string().min(1),
        limit: z.number().min(1).max(100).optional().default(50),
      }))
      .query(async ({ input }) => {
        return await getPointsHistory(input.walletAddress, input.limit);
      }),

    // Get OAuth configuration status
    getOAuthStatus: publicProcedure
      .query(() => {
        const X_CLIENT_ID = process.env.X_CLIENT_ID || "";
        const X_CLIENT_SECRET = process.env.X_CLIENT_SECRET || "";
        const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || "";
        const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";
        
        return {
          x: {
            configured: !!X_CLIENT_ID && !!X_CLIENT_SECRET,
            clientIdSet: !!X_CLIENT_ID,
          },
          discord: {
            configured: !!DISCORD_CLIENT_ID && !!DISCORD_CLIENT_SECRET,
            clientIdSet: !!DISCORD_CLIENT_ID,
          },
        };
      }),
  }),

  // Admin API (protected by admin password)
  admin: router({
    // Verify admin password
    verifyPassword: publicProcedure
      .input(z.object({
        password: z.string().min(1),
      }))
      .mutation(({ input }) => {
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "perpdex_admin_2026";
        return {
          valid: input.password === ADMIN_PASSWORD,
        };
      }),

    // Get dashboard statistics
    getStats: publicProcedure
      .query(async () => {
        return await getAdminStats();
      }),

    // Get all users with pagination
    getUsers: publicProcedure
      .input(z.object({
        page: z.number().min(1).optional().default(1),
        limit: z.number().min(1).max(100).optional().default(50),
        sortBy: z.enum(["totalPoints", "createdAt"]).optional().default("createdAt"),
        sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
      }))
      .query(async ({ input }) => {
        return await getAllWalletProfiles(
          input.page,
          input.limit,
          input.sortBy,
          input.sortOrder
        );
      }),

    // Search users
    searchUsers: publicProcedure
      .input(z.object({
        query: z.string().min(1),
        limit: z.number().min(1).max(100).optional().default(20),
      }))
      .query(async ({ input }) => {
        return await searchWalletProfiles(input.query, input.limit);
      }),

    // Adjust user points
    adjustPoints: publicProcedure
      .input(z.object({
        walletAddress: z.string().min(1),
        pointsChange: z.number(),
        reason: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        return await adjustUserPoints(
          input.walletAddress,
          input.pointsChange,
          input.reason
        );
      }),

    // Get daily post completions with tweet URLs
    getDailyPosts: publicProcedure
      .input(z.object({
        page: z.number().min(1).optional().default(1),
        limit: z.number().min(1).max(100).optional().default(50),
      }))
      .query(async ({ input }) => {
        return await getDailyPostCompletions(input.page, input.limit);
      }),

    // Get user activity statistics for graphs
    getActivityStats: publicProcedure
      .query(async () => {
        return await getUserActivityStats();
      }),
  }),
});

export type AppRouter = typeof appRouter;
