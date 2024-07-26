import NextAuth from "next-auth";

import { authConfig } from "./config";

export type { Session } from "next-auth";

const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export  signUp from "./signup";

export { handlers, auth, signIn, signOut, signUp };

export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";
