import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {

    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json(
        {
          error: "Not logged in"
        },
        {
          status: 401
        }
      );
    }


    const users = await prisma.user.findMany({
      where: {
        id: {
          not: session.userId,
        },
      },

      select: {
        id: true,
        name: true,
        age: true,
        gender: true,
        location: true,
        lookingFor: true,
        bio: true,
        imageUrl: true,
        photos: true,
      },

      take: 20,
    });


    return NextResponse.json(users);


  } catch(error){

    console.error(error);

    return NextResponse.json(
      {
        error:"Failed to load users"
      },
      {
        status:500
      }
    );
  }
}
