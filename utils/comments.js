import prisma from "@/lib/connect";

export const addOneCommentOnPost = async (userId, idPost, content, date) => {
  try {
    if (!idPost || !userId || !content || !date) return null;
    const newComment = await prisma.comments.create({
      data: {
        user_id: userId,
        article_id: idPost,
        content,
        date_created: date,
      },
    });
    console.log(newComment);
    return newComment ? true : false;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
