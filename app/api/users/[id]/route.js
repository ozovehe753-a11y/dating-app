import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        age: true,
        gender: true,
        location: true,
        lookingFor: true,
        interestedIn: true,
        occupation: true,
        education: true,
        height: true,
        smoking: true,
        drinking: true,
        interests: true,
        bio: true,
        imageUrl: true,
        photos: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("PROFILE DETAILS ERROR:", error);

    return NextResponse.json(
      { error: "Unable to load profile" },
      { status: 500 }
    );
  }
}