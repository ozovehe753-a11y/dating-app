import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({ where: { email: email?.toLowerCase() } });
    if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    await createSession(user.id);
    return NextResponse.json({ user: { id: user.id, name: user.name } });
  } catch { return NextResponse.json({ error: 'Unable to log in.' }, { status: 500 }); }
}
