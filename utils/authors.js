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

export const getProfilAuthor = async (idAuthor) => {
  try {
    if (!idAuthor) return null;
    const profilAuthor = await prisma.users.findUnique({
      where: {
        user_id: idAuthor,
      },
      include: {
        articles: {
          select: {
            article_id: true,
            title: true,
            content: true,
            read_time_minutes: true,
            date_created: true,
            article_cover: true,
            categories: true,
          },
        },
        socialmedia: true,
      },
    });
    return profilAuthor !== null ? profilAuthor : null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllProfilAuthor = async () => {
  try {
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
