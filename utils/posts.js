import prisma from "@/lib/connect";
import { getUserIdBasedOnEmail } from "./users";

export const getOnePostForAuthor = async (userId, postId) => {
  try {
    if (!userId && !postId) return null;
    const post = await prisma.articles.findUnique({
      where: {
        article_id: postId,
        user_id: userId,
      },
      include: {
        categories: true,
        comments: {
          include: {
            users: true,
          },
        },
        likes: true,
      },
    });
    return post !== null ? post : null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const getLastPost = async (max) => {
  try {
    if (!max) return null;
    const post = await prisma.articles.findMany({
      take: max,
      include: {
        categories: true,
      },
    });
    return post !== null ? post : null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const getOnePost = async (postId) => {
  try {
    if (!postId) return null;
    const post = await prisma.articles.findUnique({
      where: {
        article_id: postId,
      },
      include: {
        categories: {
          select: {
            name_categorie: true,
          },
        },
        comments: {
          include: {
            users: true,
          },
        },
        likes: true,
        users: {
          select: {
            profile_picture: true,
            username: true,
          },
        },
      },
    });
    if (!post) return null;
    delete post.user_id;
    return post;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteOnePost = async (idPost, authorEmail) => {
  try {
    if (!idPost || !authorEmail) return null;
    const idAuthor = await getUserIdBasedOnEmail(authorEmail);
    if (idAuthor === null) return null;

    const deletePost = await prisma.articles.delete({
      where: {
        article_id: idPost,
        user_id: idAuthor,
      },
    });
    console.log(deletePost);
    return deletePost ? true : false;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
