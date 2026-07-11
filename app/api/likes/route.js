import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request) {
  const session = await getSession();
  if (!session?.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { receiverId } = await request.json();
  if (!receiverId || receiverId === session.userId) return NextResponse.json({ error: 'Invalid profile.' }, { status: 400 });
  await prisma.like.upsert({ where: { senderId_receiverId: { senderId: session.userId, receiverId } }, update: {}, create: { senderId: session.userId, receiverId } });
  const mutual = await prisma.like.findUnique({ where: { senderId_receiverId: { senderId: receiverId, receiverId: session.userId } } });
  if (mutual) {
    const [userAId, userBId] = [session.userId, receiverId].sort();
    await prisma.match.upsert({ where: { userAId_userBId: { userAId, userBId } }, update: {}, create: { userAId, userBId } });
    return NextResponse.json({ matched: true });
  }
  return NextResponse.json({ matched: false });
}
