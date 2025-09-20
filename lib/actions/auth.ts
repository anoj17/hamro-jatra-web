"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import { RegisterFormData } from "../form-schema";

export const GoogleAuth = async (callbackUrl: string) => {
  await signIn("google", { callbackUrl: callbackUrl ?? "/" });
};

export const SignIn = async () => {
  await signIn("credentials", { callbackUrl: "/" });
};

export const Logout = async () => {
  await signOut();
};

export const RegisterUser = async (data: RegisterFormData) => {
  if (!data.email && !data.password && !data.name && !data.confirmPassword) {
    return {
      success: false,
      message: "Please fill in all the fields",
    };
  }
  const checkUser = await db.user.findUnique({
    where: { email: data.email },
  });
  if (checkUser) {
    return {
      success: false,
      message: "User already exists",
    };
  }
  if (data.password !== data.confirmPassword) {
    return {
      success: false,
      message: "Passwords and confirmation password do not match",
    };
  }
  try {
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        hashedPassword: await bcrypt.hash(data.password, 10),
      },
    });
    return {
      success: true,
      message: "User created successfully",
      user,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error creating user",
    };
  }
};
