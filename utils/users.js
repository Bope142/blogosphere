import prisma from "@/lib/connect";

export const getOneUser = async (email) => {
  try {
    if (!email) return null;
    const user = await prisma.users.findUnique({
      where: { email },
    });
    return user !== null ? user : null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const getUserIdBasedOnEmail = async (email) => {
  try {
    const user = await prisma.users.findUnique({
      where: { email: email },
    });
    return user !== null ? user.user_id : null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const updateOverviewUser = async (userId, overview) => {
  try {
    if (!userId || !overview) return null;
    const newOverview = await prisma.users.update({
      where: { user_id: userId },
      data: {
        overview,
      },
      select: {
        overview: true,
      },
    });
    console.log(newOverview);
    return newOverview !== null ? newOverview : null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
