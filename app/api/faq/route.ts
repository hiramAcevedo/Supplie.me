import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Obtener preguntas frecuentes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');

    const where: {
      isPublic: boolean;
      categoryId?: string;
      OR?: Array<{ question?: { contains: string; mode: 'insensitive' }; answer?: { contains: string; mode: 'insensitive' } }>;
    } = {
      isPublic: true,
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        { question: { contains: search, mode: 'insensitive' } },
        { answer: { contains: search, mode: 'insensitive' } }
      ];
    }

    const questions = await prisma.fAQQuestion.findMany({
      where,
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: [
        { likes: 'desc' },
        { createdAt: 'desc' }
      ],
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return NextResponse.json(
      { error: 'Error al obtener preguntas frecuentes' },
      { status: 500 }
    );
  }
}

// POST - Crear una nueva pregunta
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, categoryId, userId } = body;

    const newQuestion = await prisma.fAQQuestion.create({
      data: {
        question,
        categoryId,
        userId: userId || null,
        isAnswered: false,
        isPublic: true,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ question:', error);
    return NextResponse.json(
      { error: 'Error al crear pregunta' },
      { status: 500 }
    );
  }
}

