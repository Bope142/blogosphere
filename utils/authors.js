import prisma from "@/lib/connect";
import { PrismaClient } from "@prisma/client";

export const getAuthors = async (max) => {
  try {
    if (!max) return null;
    const prismaSqlRequest = new PrismaClient();

    const authors = await prismaSqlRequest.$queryRaw`
    SELECT distinct u.user_id, u.username, u.profile_picture, u.overview
    FROM users as u
    JOIN articles as a ON u.user_id = a.user_id
    WHERE EXISTS (
    SELECT 1
    FROM articles as  a2
    WHERE a2.user_id = u.user_id
    )
    LIMIT ${max}

    `;
    await prismaSqlRequest.$disconnect();

    return authors !== null ? authors : [];
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
