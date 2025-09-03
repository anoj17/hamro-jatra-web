import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "./db";

const adapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        try {
          const findUser = await db.user.findUnique({
            where: { email },
          });

          if (!findUser || !findUser.hashedPassword) {
            throw new Error("Invalid email or password");
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            findUser.hashedPassword
          );

          if (!isPasswordValid) {
            return null;
          }

          // ✅ return only allowed fields
          return {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            image: findUser.image,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.image = dbUser.image;
        }
      }
      return token; // ✅ must return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
});
