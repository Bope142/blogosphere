import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
// session: {
//   maxAge: 1 * 60,
// },
export const authOption = {
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        try {
          if (!credentials) throw new Error("No provid credentials");
          const { email, password } = credentials;
          const user = await prisma.users.findUnique({
            where: {
              email: email,
            },
          });
          console.log(user);
          const matchPasswordUser = await bcrypt.compare(
            password,
            user.password_hash
          );
          console.log(matchPasswordUser);
          if (!user || !matchPasswordUser) {
            throw new Error("Invalid credentials");
          } else {
            return user;
          }
        } catch (error) {
          throw new Error(
            "Erreur lors de l'authentification par email et mot de passe :",
            error
          );
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const userSession = await prisma.users.findUnique({
        where: {
          email: session.user.email,
        },
        include: {
          socialmedia: {
            select: {
              id: true,
              link: true,
              social_name: true,
            },
          },
        },
      });
      if (userSession !== null) {
        session.user.name = userSession.username;
        session.user.image = userSession.profile_picture;
        session.user.overview = userSession.overview;
        session.user.socialmedia = userSession.socialmedia;
        return session;
      }
    },

    async signIn({ account, user }) {
      if (account.provider === "google") {
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
          return newUser;
        } else {
          if (getUser.google_id) {
            return getUser;
          } else {
            // L'utilisateur a déjà un compte avec des identifiants classiques
            throw new Error(
              "Cette adresse e-mail a été utilisée avec une autre méthode de connexion."
            );
          }
        }
      } else {
        return user;
      }
    },
  },
};
