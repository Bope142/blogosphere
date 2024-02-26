import prisma from "@/lib/connect";
import { getOnePostForAuthor } from "@/utils/posts";
import { getOneUser } from "@/utils/users";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);

    const email = url.searchParams.get("email");
    const postId = url.searchParams.get("postId");
    if (email !== undefined && postId !== undefined) {
      const user = await getOneUser(email);
      if (user === null) {
        return NextResponse.json(
          { message: "User not found" },
          {
            status: 404,
          }
        );
      } else {
        console.log(user);
        const { user_id: idUser } = user;
        const post = await getOnePostForAuthor(idUser, parseInt(postId));

        return NextResponse.json(post, {
          status: 200,
        });
      }
    } else {
      return NextResponse.json(
        { message: "Params missing" },
        {
          status: 403,
        }
      );
    }
    // console.log(email, postId);
    // // const categories = await prisma.categories.findMany({});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Something went wrong !",
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
};
