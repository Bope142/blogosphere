import prisma from "@/lib/connect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { likePost } from "@/utils/likes";
import { getUserIdBasedOnEmail } from "@/utils/users";

export const POST = async (req) => {
  try {
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { message: "User is not authenticated" },
        {
          status: 401,
        }
      );
    }
    const data = await req.json();
    if (!data)
      return NextResponse.json(
        { message: "data no provide" },
        {
          status: 403,
        }
      );
    const { article_id } = data;
    const userId = await getUserIdBasedOnEmail(session.user.email);
    if (!userId)
      return NextResponse.json(
        { message: "User not found" },
        {
          status: 404,
        }
      );

    const newLike = await likePost(userId, article_id);
    if (newLike === null) {
      return NextResponse.json(
        { message: "Error on add like" },
        {
          status: 500,
        }
      );
    } else {
      return NextResponse.json(
        { message: "like added with success" },
        {
          status: 200,
        }
      );
    }
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
