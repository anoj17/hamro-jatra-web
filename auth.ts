import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const findUser = await db.user.findUnique({
            where: { email },
          });

          if (!findUser || !findUser.hashedPassword) {
            return null;
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
});
