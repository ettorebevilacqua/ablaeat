import type { User } from '@supabase/supabase-js'

export interface UserFull extends User, UserProfile {}
export interface UserProfile {
  full_name: string | null | undefined;
  website: string | null | undefined;
  aboutme: string | null | undefined;
  avatar_url: string | null | undefined;
  // updated_at: string | null | undefined;
}
