import { PrismaClient } from "@prisma/client";

const global = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  global.prisma ||
  new PrismaClient({
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = db;
