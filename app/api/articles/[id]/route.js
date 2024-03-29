import prisma from "@/lib/connect";
import { getOnePost } from "@/utils/posts";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    if (id !== undefined) {
      const post = await getOnePost(parseInt(id));
      return NextResponse.json(post, {
        status: 200,
      });
    } else {
      return NextResponse.json(
        { message: "Params missing" },
        {
          status: 403,
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
