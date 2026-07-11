import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import DiscoverClient from './DiscoverClient';

export default async function Discover() {
  const session = await getSession();
  if (!session?.userId) redirect('/login');
  const me = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!me) redirect('/login');
  const profiles = await prisma.user.findMany({ where: { id: { not: me.id } }, select: { id:true, name:true, age:true, location:true, bio:true, imageUrl:true }, take: 20, orderBy: { createdAt:'desc' } });
  return <DiscoverClient me={me.name} profiles={profiles} />;
}
