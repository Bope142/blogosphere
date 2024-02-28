import prisma from "@/lib/connect";
import { addOneCommentOnPost } from "@/utils/comments";
import { getUserIdBasedOnEmail } from "@/utils/users";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

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
    console.log("data", data);
    if (!data)
      return NextResponse.json(
        { message: "data no provide" },
        {
          status: 403,
        }
      );
    const { article_id, content, date_created } = data;
    const userId = await getUserIdBasedOnEmail(session.user.email);
    if (!userId)
      return NextResponse.json(
        { message: "User not found" },
        {
          status: 404,
        }
      );

    const newComment = await addOneCommentOnPost(
      userId,
      article_id,
      content,
      date_created
    );
    if (newComment === null) {
      return NextResponse.json(
        { message: "User not found" },
        {
          status: 404,
        }
      );
    } else {
      return NextResponse.json(
        { message: "Comment created with success" },
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
