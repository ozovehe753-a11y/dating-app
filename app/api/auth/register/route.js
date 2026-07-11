import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';

export async function POST(request) {
  try {
    const { name, email, password, age, gender, interestedIn, location } = await request.json();
    if (!name || !email || !password || !age || !gender || !interestedIn || !location) return NextResponse.json({ error: 'Please complete every field.' }, { status: 400 });
    if (Number(age) < 18) return NextResponse.json({ error: 'Heartly is only for adults aged 18+.' }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    const exists = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (exists) return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    const user = await prisma.user.create({ data: { name, email: email.toLowerCase(), passwordHash: await bcrypt.hash(password, 12), age: Number(age), gender, interestedIn, location } });
    await createSession(user.id);
    return NextResponse.json({ user: { id: user.id, name: user.name } }, { status: 201 });
  } catch { return NextResponse.json({ error: 'Unable to create account.' }, { status: 500 }); }
}
