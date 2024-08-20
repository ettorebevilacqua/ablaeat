import NextAuth from "next-auth";

import { authConfig } from "./config";

export type { Session } from "next-auth";
import { getUser } from './serverUser';

const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export { getUser, handlers, auth, signIn, signOut }; 

export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";
