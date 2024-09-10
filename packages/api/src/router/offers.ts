import type { TRPCRouterRecord, inferRouterInputs } from "@trpc/server";
import { z } from "zod";
import { desc, eq } from "@acme/db";
import { CreateOffersSchema, Offers, UpdateOffersSchema } from "@acme/db/schema";
import { protectedProcedure, publicProcedure } from "../trpc";

export const offersRouter = {
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));post
    return ctx.db.query.Offers.findMany({
      orderBy: desc(Offers.createdAt),
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

      return ctx.db.query.Offers.findFirst({
        where: eq(Offers.id, input.id),
      });
    }),

  create: protectedProcedure.input(CreateOffersSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(Offers).values(input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(Offers).where(eq(Offers.id, input));
  }),

  patch: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const data = { ...input, updatedAt: new Date() };
      const [UpdateOffersSchema] = await ctx.db
        .update(Offers)
        .set(data)
        .where(eq(Offers.id, input.id))
        .returning();
      return UpdateOffersSchema;
    }),

  /* update: protectedProcedure
  // .input(UpdatePostSchema)
  .mutation(({ ctx, input }) => {
    return ctx.db.update(Post).set({title: 'my title'})
      .where(eq(Post.id, 'cdfce99e-84c2-4eee-8a90-a2fea1a305ca'))
      .returning({ updatedId: Post.id }); //.values(input);
  }), */
} satisfies TRPCRouterRecord;
