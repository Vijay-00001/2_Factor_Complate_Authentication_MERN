/* eslint-disable @typescript-eslint/no-unused-expressions */
import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { UserRoles } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role: UserRoles;
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ExtendedUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    sub: string;
    role: "ADMIN" | "USER";
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async session({ session, token }) {
      console.log({ token });
      token.sub && session.user ? (session.user.id = token.sub) : null;
      token.role && session.user ? (session.user.role = token.role) : null;
      return session;
    },

    async jwt({ token }) {
      if (!token) return token;

      if (token.sub) {
        const existingUser = await getUserById(token.sub);
        console.log(existingUser);
        if (!existingUser) {
          return token;
        }
        token.role = existingUser.role;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
