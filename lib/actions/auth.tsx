"use server";

import { signIn } from "@/auth";

export const GoogleAuth = async () => {
  await signIn("google", { callbackUrl: "/register" });
};
