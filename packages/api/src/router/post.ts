import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { desc, eq } from "@acme/db";
import { CreatePostSchema, UpdatePostSchema, Post } from "@acme/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.Post.findMany({
      orderBy: desc(Post.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return ctx.db.query.Post.findFirst({
        where: eq(Post.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(Post).values(input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(Post).where(eq(Post.id, input));
  }),

  patch: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const [UpdatePostSchema] = await ctx.db
        .update(Post)
        .set({ title: input.title })
        .where(eq(Post.id, input.id))
        .returning();
      return UpdatePostSchema;
    }),

 /* update: protectedProcedure
  // .input(UpdatePostSchema)
  .mutation(({ ctx, input }) => {
    return ctx.db.update(Post).set({title: 'my title'})
      .where(eq(Post.id, 'cdfce99e-84c2-4eee-8a90-a2fea1a305ca'))
      .returning({ updatedId: Post.id }); //.values(input);
  }), */

} satisfies TRPCRouterRecord;
