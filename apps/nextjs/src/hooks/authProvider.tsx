"use client"
import { createContext, useState, useEffect } from 'react';
import { createClient } from "~/utils/supabase/client";

export const AuthContext = createContext();

const loadProfiles = async (supabase:any, userID:string)=>{
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, website, aboutme, avatar_url')
      .eq('id', userID)
      .single();
      
	if (error) {
		console.log('getUser', error)
		throw error
	 }
	     return {user:{...session, ...data}, error}
    } catch(error){
		return {user:null, error}
	}  
}

const getSessionUser = async (supabase:any): Promise<any | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
    
  return user;
  
  };
const AuthProvider = (props) => {
	const {children} = props
	
  const supabase = createClient();
  const [authenticated, setAuthenticated] = useState(!!props.session);
  const [user, setUser] = useState(props.user);
  const [session, setSession] = useState(props.session);
	
  /*useEffect(() => {
	const fetchUserData =  async () => {
    const session = await getSessionUser(supabase);
    if (session) {
	  setAuthenticated(true);
	  setSession(session);
	  const { user, error } = await loadProfiles(supabase, session);
      
      setUser({...session, ...user});
    } else setUser(null);
   }
   fetchUserData();
  }, [supabase]);
  */
  
  useEffect(() => {
	  
    const handleAuthStateChange = async (event, session) => {
	  if (event === 'INITIAL_SESSION') {
	  } else if (event === 'SIGNED_IN') {
		 const prof= await loadProfiles(supabase, session.user.id);
		 session && setSession(session);
		 data && setUser({...session, ...prof.data});
	  } else if (event === 'SIGNED_OUT') {
		setSession(null);
		setUser(null)
	  } else if (event === 'PASSWORD_RECOVERY') {
		// handle password recovery event
	  } else if (event === 'TOKEN_REFRESHED') {
		// handle token refreshed event
	  } else if (event === 'USER_UPDATED') {
		 const prof= await loadProfiles(supabase, session);
		 session && setSession(session);
		 data && setUser({...session, ...prof.data});
	  }
      
    };

    const { data } = supabase.auth.onAuthStateChange(handleAuthStateChange);
    return () => {
      data && data.subscription.unsubscribe()
    };
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ authenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
