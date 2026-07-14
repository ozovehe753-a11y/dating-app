import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }

    const { receiverId } = await request.json();

    if (!receiverId) {
      return NextResponse.json(
        { error: "Receiver ID is required" },
        { status: 400 }
      );
    }

    if (receiverId === session.userId) {
      return NextResponse.json(
        { error: "You cannot like yourself" },
        { status: 400 }
      );
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        senderId_receiverId: {
          senderId: session.userId,
          receiverId,
        },
      },
    });

    if (existingLike) {
      const existingMatch = await prisma.match.findFirst({
        where: {
          OR: [
            {
              userAId: session.userId,
              userBId: receiverId,
            },
            {
              userAId: receiverId,
              userBId: session.userId,
            },
          ],
        },
      });

      return NextResponse.json({
        message: existingMatch
          ? "You are already matched ❤️"
          : "You already liked this person ❤️",
        matched: Boolean(existingMatch),
        matchedUserId: existingMatch ? receiverId : null,
      });
    }

    await prisma.like.create({
      data: {
        senderId: session.userId,
        receiverId,
      },
    });

    const reverseLike = await prisma.like.findUnique({
      where: {
        senderId_receiverId: {
          senderId: receiverId,
          receiverId: session.userId,
        },
      },
    });

    if (reverseLike) {
      const userAId =
        session.userId < receiverId
          ? session.userId
          : receiverId;

      const userBId =
        session.userId < receiverId
          ? receiverId
          : session.userId;

      await prisma.match.upsert({
        where: {
          userAId_userBId: {
            userAId,
            userBId,
          },
        },
        update: {},
        create: {
          userAId,
          userBId,
        },
      });

      return NextResponse.json({
        message: "It's a Match! ❤️🔥",
        matched: true,
        matchedUserId: receiverId,
      });
    }

    return NextResponse.json({
      message: "Profile liked ❤️",
      matched: false,
      matchedUserId: null,
    });
  } catch (error) {
    console.error("LIKE ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to like profile",
        details: error.message,
      },
      { status: 500 }
    );
  }
}