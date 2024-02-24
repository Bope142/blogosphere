import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const categories = await prisma.categories.findMany({});
    return NextResponse.json(categories, {
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
  } finally {
    await prisma.$disconnect();
  }
};
