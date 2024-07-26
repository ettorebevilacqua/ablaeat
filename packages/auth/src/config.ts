import type {
  DefaultSession,
  NextAuthConfig,
  Session as NextAuthSession,
} from "next-auth";
import { skipCSRFCheck } from "@auth/core";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Discord from "next-auth/providers/discord";
import Credentials from './credentialsProvider';

import { db } from "@acme/db/client";
import { Account, Session, User } from "@acme/db/schema";

import { env } from "../env";

declare module "next-auth" {
  interface Session {
    user: {
     id?: string;
    } & DefaultSession["user"];
  }
}

const adapter = DrizzleAdapter(db, {
  usersTable: User,
  accountsTable: Account,
  sessionsTable: Session,
});

export const isSecureContext = env.NODE_ENV !== "development";

export const authConfig = {
  adapter,
  // In development, we need to skip checks to allow Expo to work
  ...(!isSecureContext
    ? {
        skipCSRFCheck: skipCSRFCheck,
        trustHost: true,
      }
    : {}),
  secret: env.AUTH_SECRET,
  providers: [Discord, ...Credentials],
  callbacks: {
    session: (opts) => {
      if (!("user" in opts))
        throw new Error("unreachable with session strategy");

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },
    async jwt({ token, user, account }) {
      // initial signin
      if (user && account) {
        return user as JWT;
      }

      // Return previous token if the access token has not expired
      if (Date.now() < token.exp * 100) {
        return token;
      }

      // refresh token
      return (await refreshAccessToken(token)) as JWT;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
  },
} satisfies NextAuthConfig;



export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const sessionToken = token.slice("Bearer ".length);
  const session = await adapter.getSessionAndUser?.(sessionToken);
  return session
    ? {
        user: {
          ...session.user,
        },
        expires: session.session.expires.toISOString(),
      }
    : null;
};

export const invalidateSessionToken = async (token: string) => {
  await adapter.deleteSession?.(token);
};