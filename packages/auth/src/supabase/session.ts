import type { GetServerSidePropsContext } from 'next';
// import { cache } from 'react';
import {createClient} from './server';

// export const getUserFromContext = async (ctx: GetServerSidePropsContext): Promise<User | null> => {
const getSessionUser = async (): Promise<any | null> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();
	return user;
  };
  
  export const getSession =getSessionUser;
  export const getUser = async (userId: string) => {
	  
  const session = await getSessionUser();
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
		throw error
	 }
	     return {user:{...session, ...data}, error}
    } catch(error){
		return {user:null, session, error}
	}    
   
};
  

