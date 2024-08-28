import { cache } from "react";
import NextAuth from "next-auth";
export type {  Session, User, UserResponse, AuthError} from '@supabase/supabase-js'

import { authConfig } from "./config";

// export type { Session } from "next-auth";
import { getUser, getSession } from './supabase/session';
import { createClient } from './supabase/server';
import { signOut } from './supabase/actions';

 const { handlers, auth: defaultAuth, signIn } = NextAuth(authConfig);
	
/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to next-auth's default `auth()` function and only call it once per request
 */
const auth = cache(defaultAuth);

export { handlers, auth };
export { getUser, getSession, signOut, createClient };

export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";
