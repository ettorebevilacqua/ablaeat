import { authRouter } from "./router/auth";
import { userRouter } from "./router/users";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
