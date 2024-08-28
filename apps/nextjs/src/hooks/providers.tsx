"use client";

import type { Session, UserFull } from "@acme/auth";
import AuthProvider from "./authProvider";

// define here all provider and pass to layout

export function Providers({ user, session, children }
  : { user: UserFull | null, session: Session | null, children: React.ReactNode }) {
  return (
    <AuthProvider user={user} session={session}>
      {children}
    </AuthProvider>
  );
}
