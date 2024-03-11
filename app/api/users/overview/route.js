import { NextResponse } from "next/server";
import prisma from "@/lib/connect";
import { getServerSession } from "next-auth";
import { getUserIdBasedOnEmail, updateOverviewUser } from "@/utils/users";

export const PUT = async (req) => {
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
    const user = await getUserIdBasedOnEmail(session.user.email);
    if (user === null) {
      return NextResponse.json(
        { message: "User not found" },
        {
          status: 404,
        }
      );
    } else {
      const { overview } = await req.json();
      if (!overview) {
        return NextResponse.json(
          { message: "Params missing" },
          {
            status: 403,
          }
        );
      } else {
        const newOverview = await updateOverviewUser(user, overview);
        if (newOverview === null)
          return NextResponse.json(
            {
              message: "error updating overview",
            },
            {
              status: 500,
            }
          );

        return NextResponse.json(newOverview, {
          status: 200,
        });
      }
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
