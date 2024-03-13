import { NextResponse } from "next/server";
import { getAllPost } from "@/utils/posts";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);

    const max = url.searchParams.get("max");
    const skip = url.searchParams.get("skip");
    if (max !== undefined && skip !== undefined) {
      const post = await getAllPost(parseInt(max), parseInt(skip));

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
  }
};
