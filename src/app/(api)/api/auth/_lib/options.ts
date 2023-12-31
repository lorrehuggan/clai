import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import db from '~/lib/db/client';
import { env } from '~/lib/env/server';

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as unknown as NextAuthOptions['adapter'],
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user.id;
      return session;
    },
    async jwt({ token, account, user }) {
      return {
        token,
        account,
        user,
      };
    },
  },
};
