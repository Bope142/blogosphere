import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";

export const authOption = {
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log(session);
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        console.log(account.provider);
        const getUser = await prisma.users.findUnique({
          where: {
            email: user.email,
          },
        });

        if (getUser === null) {
          const newUser = await prisma.users.create({
            data: {
              username: user.name,
              email: user.email,
              google_id: user.id,
              profile_picture: user.image,
              role_user: "simple_user",
            },
          });

          console.log(newUser);
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        await prisma.$disconnect();
      }
    },
  },
};
