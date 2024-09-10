// import { cache } from 'react';
import { createClient } from './server';
import { AuthError, User, UserResponse } from '@supabase/supabase-js';
import { UserFull } from '..';

// export const getUserFromContext = async (ctx: GetServerSidePropsContext): Promise<User | null> => {
/*
export const getSession = async (): Promise<Session | null> => {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};
*/

export const getUserSession = async (): Promise<{session: User | null, error: AuthError | null}> => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser();
  return { session:user, error }
};

export const getUser = async () => {

  const {session, error} = await getUserSession();
  if (!session) return { user: null, error }
  
    const supabase = await createClient();
  // Since the CreateServerSupbaseClient is wrapped in <Database> type, the
  // query method is now typesafe.
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, website, aboutme, avatar_url')
      .eq('id', session.id)
      .single();

    if (error) {
      console.log('getUser', error)
      return { user: null, error }
    }
  
    return { user: { ...session, ...(data ?? {}) } as UserFull, error }
  } catch (error) {
    return { user: null, error }
  }

};


