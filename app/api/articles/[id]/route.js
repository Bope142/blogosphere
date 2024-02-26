import prisma from "@/lib/connect";
import { getOnePost } from "@/utils/posts";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    console.log("param", params);
    const { id } = params;

    if (id !== undefined) {
      const post = await getOnePost(parseInt(id));

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
    return NextResponse.json(
      { message: "Params missing" },
      {
        status: 200,
      }
    );
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
