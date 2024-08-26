import type { GetServerSidePropsContext } from 'next';
import {createClient} from './supabase/server';

// export const getUserFromContext = async (ctx: GetServerSidePropsContext): Promise<User | null> => {
export const getUser = async (): Promise<any | null> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
   const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, website, aboutme, avatar_url`)
        .eq('id', user?.id)
        .single() 
  return { user: {...user, ...data}, error, status };
};
