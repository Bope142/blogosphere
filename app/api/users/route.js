import { NextResponse } from "next/server";
import prisma from "@/lib/connect";
const bcrypt = require("bcrypt");

const createOneUser = async (data) => {
  try {
    const { username, password, email } = data;
    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        username,
        password_hash,
        email,
        role_user: "simple_user",
      },
    });
    return newUser;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
const existUserEmail = async (email) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      select: { username: true },
    });
    return user !== null ? true : false;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

const checkExistUsername = async (username) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
      select: { user_id: true },
    });
    return user !== null ? true : false;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    console.log(data);
    const userWithEmail = await existUserEmail(data.email);
    if (!userWithEmail) {
      const existUsername = await checkExistUsername(data.username);
      if (!existUsername) {
        const user = await createOneUser(data);
        console.log(user);
        return NextResponse.json(user, {
          status: 200,
        });
      } else {
        return NextResponse.json(
          {
            code: "B-409-USERNAME",
            message: "This username already exists",
          },
          {
            status: 409,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          code: "B-409-EMAIL",
          message: "User with that email already exists",
        },
        {
          status: 409,
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
