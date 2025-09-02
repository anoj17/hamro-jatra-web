import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { Adapter } from "next-auth/adapters";
import CredentialProvider from "next-auth/providers/credentials";
import { loginSchema } from "./lib/form-schema";
import { CredentialsSignin } from "next-auth";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

class InvalidLoginError extends CredentialsSignin {
  code = "invalid-credentials";
}

class UserNotFoundError extends CredentialsSignin {
  code = "user-not-found";
}

class UserNotVerifiedError extends CredentialsSignin {
  code = "user-not-verified";
}

class UserDeactivatedError extends CredentialsSignin {
  code = "user-deactivated";
}

const authConfig = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Google({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    CredentialProvider({
      id: "credentials", // Standard username/password login
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);
          const user = await db.user.findFirst({
            where: {
              email,
            },
          });

          if (!user) {
            throw new UserNotFoundError();
          }
          if (user.hashedPassword) {
            throw new UserNotVerifiedError();
          }

          const isMatched = bcrypt.compareSync(password, user.hashedPassword!);
          if (!isMatched) {
            throw new InvalidLoginError();
          }

          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            hashedPassword: user.hashedPassword,
            image: user.image,
            // role: user.role,

            createdAt: user.createdAt,
            updatedAt: user.updatedAt,

            userValId: user.id,
            userPermissions: [],
          };

          return payload;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          throw error;
        }
      },
    }),
  ],
};

export default authConfig;
