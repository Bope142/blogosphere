import { NextResponse } from "next/server";
import prisma from "@/lib/connect";
import { getServerSession } from "next-auth";
import { getUserIdBasedOnEmail, createSocialMedia } from "@/utils/users";

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
    const user = await getUserIdBasedOnEmail(session.user.email);
    if (user === null) {
      return NextResponse.json(
        { message: "User not found" },
        {
          status: 404,
        }
      );
    } else {
      const { youtube, facebook, instagram, linkedin, github } =
        await req.json();
      if (!youtube || !facebook || !instagram || !github || !linkedin) {
        return NextResponse.json(
          { message: "Params missing" },
          {
            status: 403,
          }
        );
      } else {
        const socialMedia = await createSocialMedia(
          user,
          youtube,
          facebook,
          instagram,
          linkedin,
          github
        );
        if (socialMedia === null)
          return NextResponse.json(
            {
              message: "error updating overview",
            },
            {
              status: 500,
            }
          );

        return NextResponse.json(socialMedia, {
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
