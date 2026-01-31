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
  getJSTDateString,
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
        const todayJST = getJSTDateString();
        
        return {
          ...profile,
          dailyPostCompleted,
          todayJST,
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
  }),
});

export type AppRouter = typeof appRouter;
