import prisma from "@/lib/connect";
import { getLastPost } from "@/utils/posts";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);

    const max = url.searchParams.get("max");

    if (max !== undefined) {
      const post = await getLastPost(parseInt(max));
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
