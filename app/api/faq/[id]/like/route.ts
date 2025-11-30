import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Dar like a una pregunta
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const question = await prisma.fAQQuestion.update({
      where: { id },
      data: {
        likes: { increment: 1 }
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error('Error liking FAQ question:', error);
    return NextResponse.json(
      { error: 'Error al dar like' },
      { status: 500 }
    );
  }
}

