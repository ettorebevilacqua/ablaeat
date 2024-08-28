"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";

import { createClient } from "~/utils/supabase/client";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import type { UserFull } from "@acme/auth";

export interface IAuthContext { authenticated: boolean, user?: UserFull | null, reload: () => Promise<void> }
const empityPromise = () => new Promise<void>(() => null)
export const AuthContext = createContext<IAuthContext>({ authenticated: false, user: null, reload: empityPromise });

const loadProfiles = async (supabase: SupabaseClient, userID: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, website, aboutme, avatar_url")
      .eq("id", userID)
      .single();

    if (error) {
      console.log("getUser", error);
      throw error as unknown;
    }
    return { user: data, error };
  } catch (error) {
    return { user: null, error };
  }
};

const getSessionUser = async (supabase: SupabaseClient): Promise<{ user: User | null, session: Session | null }> => {
  const { data: { user }} = await supabase.auth.getUser();
  const { data: { session }} = await supabase.auth.getSession();

  return { session, user };
};

const AuthProvider = (props: { session?: Session | null; user?: UserFull | null; children?: React.ReactNode; }) => {
  const { children } = props;

  const supabase = createClient();
  const [authenticated, setAuthenticated] = useState(!!props.session);
  const [user, setUser] = useState(props.user ?? null);
  const [session, setSession] = useState<Session | null>(props.session ?? null);

  const reload = useCallback(async () => {
    const {session: _session } = await getSessionUser(supabase);
    if (_session) {
      setAuthenticated(true);
      setSession(_session);
      const res = await loadProfiles(supabase, _session.user.id);
      if (res.user) {
        setUser(user);
      }
    } else {
      setUser(null);
      setSession(session);
    }
  }, [session, supabase, user]);

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
    const handleAuthStateChange = (event: string) => {
      if (event === "INITIAL_SESSION") { /* empty */ } else if (event === "SIGNED_IN") {
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

  return (
    <AuthContext.Provider value={{ authenticated, user, reload }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
