import prisma from "@/lib/connect";
import { getUserIdBasedOnEmail } from "@/utils/users";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await req.json();
    if (!data)
      return NextResponse.json(
        {
          msg: "No data provided ",
        },
        {
          status: 400,
        }
      );

    const {
      title,
      read_time_minutes,
      category_id,
      article_cover,
      content,
      email,
    } = data;
    console.log(content);
    const user_id = await getUserIdBasedOnEmail(email);

    if (user_id === null) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    } else {
      const newArticle = await prisma.articles.create({
        data: {
          title,
          read_time_minutes,
          category_id,
          article_cover,
          content,
          user_id,
        },
      });
      return NextResponse.json(newArticle, {
        status: 200,
      });
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
