'use client';

import AuthProvider from './authProvider';

// define here all provider and pass to layout

export function Providers({ user, session, children }:any) {
  return (
      <AuthProvider user={user} session={session}>{children}</AuthProvider>
  );
}
