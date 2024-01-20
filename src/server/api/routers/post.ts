import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { create } from "domain";
import { link } from "fs";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getFeeds: publicProcedure
    .input(z.object({ type: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.feed.findMany({
        orderBy: { createdAt: input.type === "desc" ? "desc" : "asc" },
      });
    }),

  getFeedsPopular: publicProcedure.query(({ ctx }) => {
    return ctx.db.feed.findMany({
      orderBy: { score: "desc" },
    });
  }),

  getFeedsByProvince: publicProcedure
    .input(z.object({ province: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.feed.findMany({
        where: { province: input.province },
      });
    }),

  createFeed: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        image: z.string(),
        score: z.number(),
        commentCount: z.number(),
        createdAt: z.number(),
        link: z.string(),
        province: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.feed.create({
        data: {
          title: input.title,
          content: input.content,
          image: input.image,
          score: input.score,
          commentCount: input.commentCount,
          createdAt: input.createdAt,
          link: input.link,
          province: input.province,
        },
      });
    }),

  setUpvote: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const feed = await ctx.db.feed.findUnique({
        where: { id: input.id },
      });
      if (feed) {
        return ctx.db.feed.update({
          where: { id: input.id },
          data: { score: feed.score + 1 },
        });
      }
      return null;
    }),

  setDownvote: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const feed = await ctx.db.feed.findUnique({
        where: { id: input.id },
      });
      if (feed) {
        return ctx.db.feed.update({
          where: { id: input.id },
          data: { score: feed.score - 1 },
        });
      }
      return null;
    }),
});
