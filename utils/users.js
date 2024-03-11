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

export const createDefaultSocialMedia = async (
  userId,
  youtube,
  facebook,
  instagram,
  linkedin,
  github
) => {
  try {
    if (!userId || !youtube || !facebook || !instagram || !github || !linkedin)
      return null;
    const socialMedia = await prisma.users.create({
      data: [
        {
          user_id: userId,
          social_name: "youtube",
          link: youtube,
        },
        {
          user_id: userId,
          social_name: "facebook",
          link: facebook,
        },
        {
          user_id: userId,
          social_name: "instagram",
          link: instagram,
        },
        {
          user_id: userId,
          social_name: "github",
          link: github,
        },
        {
          user_id: userId,
          social_name: "linkedin",
          link: linkedin,
        },
      ],
    });
    console.log(socialMedia);
    return socialMedia !== null ? socialMedia : null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const createSocialMedia = async (
  userId,
  youtube,
  facebook,
  instagram,
  linkedin,
  github
) => {
  try {
    if (!userId || !youtube || !facebook || !instagram || !github || !linkedin)
      return null;
    const existSocialMedia = await prisma.socialmedia.findMany({
      where: {
        user_id: userId,
      },
    });

    if (existSocialMedia.length > 0) {
      await prisma.socialmedia.deleteMany({
        where: {
          user_id: userId,
        },
      });
    }
    const createSocialMedia = await prisma.socialmedia.createMany({
      data: [
        {
          user_id: userId,
          social_name: "youtube",
          link: youtube,
        },
        {
          user_id: userId,
          social_name: "facebook",
          link: facebook,
        },
        {
          user_id: userId,
          social_name: "instagram",
          link: instagram,
        },
        {
          user_id: userId,
          social_name: "github",
          link: github,
        },
        {
          user_id: userId,
          social_name: "linkedin",
          link: linkedin,
        },
      ],
    });
    return createSocialMedia !== null ? createSocialMedia : null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
