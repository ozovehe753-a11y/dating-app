import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }

    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { userAId: session.userId },
          { userBId: session.userId },
        ],
      },

      include: {
        userA: {
          select: {
            id: true,
            name: true,
            age: true,
            imageUrl: true,
          },
        },

        userB: {
          select: {
            id: true,
            name: true,
            age: true,
            imageUrl: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const inbox = await Promise.all(
      matches.map(async (match) => {
        const user =
          match.userAId === session.userId
            ? match.userB
            : match.userA;

        const lastMessage =
          await prisma.message.findFirst({
            where: {
              OR: [
                {
                  senderId: session.userId,
                  receiverId: user.id,
                },
                {
                  senderId: user.id,
                  receiverId: session.userId,
                },
              ],
            },

            orderBy: {
              createdAt: "desc",
            },

            select: {
              content: true,
              createdAt: true,
              senderId: true,
            },
          });

        return {
          ...user,
          matchedAt: match.createdAt,
          lastMessage,
        };
      })
    );

    inbox.sort((a, b) => {
      const aDate =
        a.lastMessage?.createdAt || a.matchedAt;

      const bDate =
        b.lastMessage?.createdAt || b.matchedAt;

      return new Date(bDate) - new Date(aDate);
    });

    return NextResponse.json(inbox);
  } catch (error) {
    console.error("MATCHES ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to load matches",
        details: error.message,
      },
      { status: 500 }
    );
  }
}