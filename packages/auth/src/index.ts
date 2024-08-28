import NextAuth from "next-auth";
export type { Session, User, UserResponse, AuthError } from '@supabase/supabase-js'
import { authConfig } from "./config";

// export type { Session } from "next-auth";
import { getUser, getSession } from './supabase/session';
import { signOut } from './supabase/actions';
import { createClient } from './supabase/server';
import { User } from "@supabase/supabase-js";

export interface UserFull extends User {
  full_name: string,
  aboutme: string,
  avatar_url: string,
  updated_at: string,
}

const { handlers, auth, signIn } = NextAuth(authConfig);
export { handlers, auth, signIn };
export { getUser, getSession, signOut, createClient };
export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";


