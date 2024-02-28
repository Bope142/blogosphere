import prisma from "@/lib/connect";
import { deleteOnePost, getOnePostForAuthor } from "@/utils/posts";
import { getOneUser } from "@/utils/users";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

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
    console.log(session);
    const url = new URL(req.url);

    const email = session.user.email;
    const postId = url.searchParams.get("postId");
    if (email !== undefined && postId !== undefined) {
      const user = await getOneUser(email);
      if (user === null) {
        return NextResponse.json(
          { message: "User not found" },
          {
            status: 404,
          }
        );
      } else {
        const { user_id: idUser } = user;
        const post = await getOnePostForAuthor(idUser, parseInt(postId));
        console.log(post);
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
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req) => {
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
    const postId = url.searchParams.get("postId");
    if (email !== undefined && postId !== undefined) {
      const deletePost = await deleteOnePost(parseInt(postId), email);
      if (deletePost === null || false) {
        return NextResponse.json(
          { message: "User not authorized to delete this post" },
          {
            status: 403,
          }
        );
      }
      return NextResponse.json(
        { message: "Post delete with success" },
        {
          status: 200,
        }
      );
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
