import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const updateData = {
      name: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
      age: Number(data.age),
      gender: data.gender,
      lookingFor: data.lookingFor,
      interestedIn: data.interestedIn,

      minAge: data.minAge ? Number(data.minAge) : null,
      maxAge: data.maxAge ? Number(data.maxAge) : null,

      distance: data.distance,
      occupation: data.occupation,
      education: data.education,
      height: data.height,
      smoking: data.smoking,
      drinking: data.drinking,
      interests: data.interests,
      location: data.location,
      bio: data.bio,
    };

    if (data.imageUrl) {
      updateData.imageUrl = data.imageUrl;
    }

    const profile = await prisma.user.update({
      where: {
        id: session.userId,
      },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);

    return NextResponse.json(
      {
        error: "Profile update failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}