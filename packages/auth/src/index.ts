import NextAuth from "next-auth";

import { authConfig } from "./config";

export type { Session } from "next-auth";
import { getUser, getSession } from './supabase/session';
import { signOut } from './supabase/actions';
import { createClient } from './supabase/server';

const { handlers, auth, signIn } = NextAuth(authConfig);
export { handlers, auth, signIn };
export { getUser, getSession, signOut,createClient };
export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";
