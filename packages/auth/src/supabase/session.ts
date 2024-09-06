// import { cache } from 'react';
import { createClient } from './server';
import { Session } from '@supabase/supabase-js';
import { UserFull } from '..';

// export const getUserFromContext = async (ctx: GetServerSidePropsContext): Promise<User | null> => {
export const getSession = async (): Promise<Session | null> => {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

export const getUser = async () => {

  const session = await getSession();
  const supabase = await createClient();
  // Since the CreateServerSupbaseClient is wrapped in <Database> type, the
  // query method is now typesafe.
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, website, aboutme, avatar_url')
      .eq('id', session?.user.id)
      .single();

    if (error) {
      console.log('getUser', error)
      throw error
    }
    return { user: { ...session?.user, ...(data ?? {}) } as UserFull, session, error }
  } catch (error) {
    return { user: null, session, error }
  }

};


