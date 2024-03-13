import { NextResponse } from "next/server";
import { getAuthors } from "@/utils/authors";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);

    const max = url.searchParams.get("max");
    if (max) {
      const post = await getAuthors(parseInt(max));

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
