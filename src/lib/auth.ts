import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma";

declare module 'next-auth' {
  interface Session {
    provider?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      // .envにAUTH_GOOGLE_xx で設定している場合は以下は不要
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    // cf. https://next-auth.js.org/configuration/callbacks#jwt-callback
    async session({ session, token }) {
      // sessionにtoken情報をセット（各ページで利用するため）
      if (token.sub) session.user.id = token.sub;
      if (token.name) session.user.name = token.name;
      if (token.email) session.user.email = token.email;
      if (token.picture) session.user.image = token.picture;
      if (token.provider) session.provider = token.provider;

      return session;
    },
    async jwt({ token, user, account }) {
      // token にproviderとidセット
      if (user) {
        token.provider = account?.provider;
        token.sub = user.id;
      }
      
      return token;
    },
  }
})
