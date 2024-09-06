import NextAuth from "next-auth";
import type { Session, User, UserResponse, AuthError, PostgrestError } from '@supabase/supabase-js'
import { authConfig } from "./config";

// export type { Session } from "next-auth";
import { getUser, getSession } from './supabase/session';
import { signOut } from './supabase/actions';
import { createClient } from './supabase/server';
export type {  Session, User, UserResponse, AuthError } 

export interface UserFull extends User, UserProfile {}

export interface UserProfile {
  full_name: string | null | undefined;
  website: string | null | undefined;
  aboutme: string | null | undefined;
  avatar_url: string | null | undefined;
  // updated_at: string | null | undefined;
}

export type DbError = PostgrestError

const { handlers, auth, signIn } = NextAuth(authConfig);
export { handlers, auth, signIn };
export { getUser, getSession, signOut, createClient };
export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";


