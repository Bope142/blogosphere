import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getUserIdBasedOnEmail, updateProfilPicture } from "@/utils/users";

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
      const { urlProfil } = await req.json();
      if (!urlProfil) {
        return NextResponse.json(
          { message: "Params missing" },
          {
            status: 403,
          }
        );
      } else {
        const newProfilPicture = await updateProfilPicture(user, urlProfil);
        if (newProfilPicture === null)
          return NextResponse.json(
            {
              message: "error updating profil picture",
            },
            {
              status: 500,
            }
          );

        return NextResponse.json(newProfilPicture, {
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
