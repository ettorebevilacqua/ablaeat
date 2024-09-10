import NextAuth from "next-auth";
import type { Session, User, UserResponse, AuthError, PostgrestError } from '@supabase/supabase-js'
// import { authConfig } from "./config";

// export type { Session } from "next-auth";
import { getUser, getUserSession } from './supabase/session';
import { signOut } from './supabase/actions';
import { createClient } from './supabase/server';
import type {UserProfile, UserFull} from './supabase/type'

export type {  Session, User, UserResponse, AuthError, UserFull, UserProfile } 
export type DbError = PostgrestError

// const { handlers, auth, signIn } = NextAuth(authConfig);
// export { handlers, auth, signIn };
export { getUser, getUserSession, signOut, createClient };
/*
export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";
*/

