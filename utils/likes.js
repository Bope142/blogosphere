import prisma from "@/lib/connect";
import { PrismaClient } from "@prisma/client";

const checkLikeStatus = async (userId, idPost) => {
  try {
    if (!idPost || !userId) return null;
    const prismaSqlRequest = new PrismaClient();

    const like = await prismaSqlRequest.$queryRaw`
    SELECT * FROM  likes WHERE user_id =${userId} AND article_id =${idPost}
    `;
    await prismaSqlRequest.$disconnect();
    return like.length == !0 ? like[0].like_id : -1;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const removelikeOnePost = async (idLink) => {
  try {
    if (!idLink) return null;
    const removeLike = await prisma.likes.delete({
      where: {
        like_id: idLink,
      },
    });
    return removeLike ? removeLike : null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const likePost = async (userId, idPost) => {
  try {
    if (!idPost || !userId) return null;
    const checkStatusLike = await checkLikeStatus(userId, idPost);
    if (checkStatusLike !== -1) {
      const removeLike = await removelikeOnePost(checkStatusLike);
      return removeLike ? removeLike : null;
    } else {
      const newLike = await prisma.likes.create({
        data: {
          user_id: userId,
          article_id: idPost,
        },
      });
      return newLike ? newLike : null;
    }
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
