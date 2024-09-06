"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";

import { createClient } from "~/utils/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { UserFull, UserProfile, DbError } from "@acme/auth";

export interface IAuthContext { authenticated: boolean, user?: UserFull | null, error:string | null, reload: () => Promise<void> }
const empityPromise = () => new Promise<void>(() => null)
export const AuthContext = createContext<IAuthContext>({ authenticated: false, user: null, error: null, reload: empityPromise });

const loadProfiles = async (supabase: SupabaseClient, userID: string): Promise<[DbError | null, UserProfile | null ]> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, website, aboutme, avatar_url, updated_at")
      .eq("id", userID)
      .single();

    if (error) {
      console.log("getUser", error);
      // normalizeError(error as unknown)
      return [ error, null ];
      // throw error as unknown;
    }
    return [ null, data ];

};

const AuthProvider = ({ children }: { children?: React.ReactNode; }) => {

  const supabase = createClient();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<UserFull | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user)  {
      setUser(null)
      return
    }
      setAuthenticated(true);
      const [error, userProf ] = await loadProfiles(supabase, user.id);
      if (error ){
        setError('user profile not found')
      }
      
      if(userProf){
        const userFull: UserFull = { ...user, ...userProf }
        setUser(userFull)
      } // else {setUser(user )}

  }, [supabase]);

  useEffect(() => {
    void reload();
  }, [reload]);


  /* useEffect(() => {
    const handleAuthStateChange = (event: string) => {
      if (event === "INITIAL_SESSION") { 
      // empty 
     } else if (event === "SIGNED_IN") {
        reload().then(() => null).catch(() => null);
      } else if (event === "SIGNED_OUT") {
        setSession(null);
        setUser(null);
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        reload().then(() => null).catch(() => null);;
      }
    };

    const { data } = supabase.auth.onAuthStateChange(handleAuthStateChange);
    return () => {
      data.subscription.unsubscribe();
    };
  }, [reload, supabase]);
  */

  return (
    <AuthContext.Provider value={{ authenticated, user, reload, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
