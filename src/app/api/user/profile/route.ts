import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { bloodGroup, phone, address } = body;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        bloodGroup,
        phone,
        address,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
