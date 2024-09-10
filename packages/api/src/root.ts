// import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { userRouter } from "./router/users";
import { offersRouter } from "./router/offers";
import { createTRPCRouter } from "./trpc";

import type { inferRouterInputs } from "@trpc/server";

export const appRouter = createTRPCRouter({
 // auth: authRouter,
  post: postRouter,
  user: userRouter,
  offers: offersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
