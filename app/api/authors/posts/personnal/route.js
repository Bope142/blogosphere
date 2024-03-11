import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getUserIdBasedOnEmail } from "@/utils/users";
import { getPostAuthorWithPagination } from "@/utils/posts";

export const GET = async (req) => {
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
    const url = new URL(req.url);

    const email = session.user.email;
    const max = url.searchParams.get("max");
    const skip = url.searchParams.get("skip");
    if (max !== undefined && skip !== undefined) {
      const user = await getUserIdBasedOnEmail(email);
      if (user === null) {
        return NextResponse.json(
          { message: "User not found" },
          {
            status: 404,
          }
        );
      } else {
        const post = await getPostAuthorWithPagination(
          user,
          parseInt(max),
          parseInt(skip)
        );

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
