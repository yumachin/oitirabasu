// lib/auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismaClient";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // 他のプロバイダーを追加することも可能です
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // セッション管理の方法（JWTを使用）
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id; // セッションにユーザーIDを追加
      return session;
    },
  },
};

export default NextAuth(authOptions);
