import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const match = await prisma.match.findFirst({
      where: {
        OR: [
          {
            userAId: session.userId,
            userBId: userId,
          },
          {
            userAId: userId,
            userBId: session.userId,
          },
        ],
      },
    });

    if (!match) {
      return NextResponse.json(
        { error: "You can only message your matches" },
        { status: 403 }
      );
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: session.userId,
            receiverId: userId,
          },
          {
            senderId: userId,
            receiverId: session.userId,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      currentUserId: session.userId,
      messages,
    });
  } catch (error) {
    console.error("LOAD MESSAGES ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to load messages",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }

    const { receiverId, content } = await request.json();

    if (!receiverId || !content?.trim()) {
      return NextResponse.json(
        { error: "Receiver and message are required" },
        { status: 400 }
      );
    }

    const match = await prisma.match.findFirst({
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

    if (!match) {
      return NextResponse.json(
        { error: "You can only message your matches" },
        { status: 403 }
      );
    }

    const message = await prisma.message.create({
      data: {
        senderId: session.userId,
        receiverId,
        content: content.trim(),
      },
    });

    return NextResponse.json(message, {
      status: 201,
    });
  } catch (error) {
    console.error("SEND MESSAGE ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to send message",
        details: error.message,
      },
      { status: 500 }
    );
  }
}