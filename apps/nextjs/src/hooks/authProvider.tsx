"use client"
import { createContext, useState, useEffect, useCallback } from 'react';
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
	     return {user:data, error}
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
	
const reload =	useCallback(async ()=>{
	const _session = await getSessionUser(supabase);
	 if (_session) {
	  setAuthenticated(true);
	  setSession(_session);
	  const res = await loadProfiles(supabase, _session.id);
      if (res.user){
		  setUser({..._session, ...res.user});
	  } 
    } else {
		setUser(null);
		setSession(session);
	}
})
  /*useEffect(() => {
	const fetchUserData =  async () => {
    const session = await getSessionUser(supabase);
    if (session) {
	  setAuthenticated(true);
	  setSession(session);
	  const { data, error } = await loadProfiles(supabase, session);
      
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
		 reload();
	  } else if (event === 'SIGNED_OUT') {
		setSession(null);
		setUser(null)
	  } else if (event === 'PASSWORD_RECOVERY') {
		// handle password recovery event
	  } else if (event === 'TOKEN_REFRESHED') {
		// handle token refreshed event
	  } else if (event === 'USER_UPDATED') {
		 reload();
	  }
      
    };

    const { data } = supabase.auth.onAuthStateChange(handleAuthStateChange);
    return () => {
      data && data.subscription.unsubscribe()
    };
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ authenticated, user, setUser, reload }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
