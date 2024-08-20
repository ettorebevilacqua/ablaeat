import type { GetServerSidePropsContext } from 'next';
import {createClient} from './supabase/server';

// export const getUserFromContext = async (ctx: GetServerSidePropsContext): Promise<User | null> => {
export const getUser = async (): Promise<User | null> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
