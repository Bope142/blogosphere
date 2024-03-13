import prisma from "@/lib/connect";
import { getProfilAuthor } from "@/utils/authors";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { idAuthor } = params;

    if (idAuthor !== undefined) {
      const post = await getProfilAuthor(parseInt(idAuthor));
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
