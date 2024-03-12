import prisma from "@/lib/connect";
import { getAllPostFromCategory } from "@/utils/posts";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { idCategory } = params;

    if (idCategory !== undefined) {
      const post = await getAllPostFromCategory(parseInt(idCategory));
      console.log(post);
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
