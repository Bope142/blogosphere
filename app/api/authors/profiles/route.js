import { NextResponse } from "next/server";
import { getAllProfilAuthor } from "@/utils/authors";

export const GET = async () => {
  try {
    const profilAuthor = await getAllProfilAuthor();

    return NextResponse.json(profilAuthor, {
      status: 200,
    });
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
