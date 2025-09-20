"use server";

import { db } from "@/db";
import { Jatra, Prisma } from "@prisma/client";

export interface Response<T> {
  data: T[];
  total: number;
}

export async function getAllJatras(
  searchTerms?: string,
  category?: string,
  status?: string
): Promise<Response<Jatra>> {
  const where: Prisma.JatraWhereInput = {};

  if (searchTerms) {
    where.OR = [
      { title: { contains: searchTerms, mode: "insensitive" } },
      { location: { contains: searchTerms, mode: "insensitive" } },
      { district: { contains: searchTerms, mode: "insensitive" } },
    ];
  }

  if (category && category !== "all") {
    where.category = category;
  }

  const [data, total] = await Promise.all([
    db.jatra.findMany({
      where,
      orderBy: { createdAt: "desc" },
    }),
    db.jatra.count({ where }),
  ]);

  return { data, total };
}
