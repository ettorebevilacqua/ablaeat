import NextAuth from "next-auth";

import { authConfig } from "./config";
import  signUp from "./signup";

export type { Session } from "next-auth";



const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export { handlers, auth, signIn, signOut, signUp };

export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";
