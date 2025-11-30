import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Obtener categorías de FAQ
export async function GET() {
  try {
    const categories = await prisma.fAQCategory.findMany({
      include: {
        _count: {
          select: { questions: true }
        }
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching FAQ categories:', error);
    return NextResponse.json(
      { error: 'Error al obtener categorías de FAQ' },
      { status: 500 }
    );
  }
}

