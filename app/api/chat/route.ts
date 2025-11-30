import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { MessageSender } from '@prisma/client';

// Respuestas automáticas del bot
const botResponses: Record<string, string> = {
  'hola': '¡Hola! 👋 Bienvenido a Supplie.me. ¿En qué puedo ayudarte hoy?',
  'precio': 'Actualmente estamos en fase beta y el acceso es gratuito. Pronto lanzaremos planes accesibles para pequeños comerciantes. ¿Te gustaría ser parte de nuestros beta testers?',
  'demo': '¡Excelente! Para solicitar una demo, puedes contactarnos en contacto@supplie.me o a través de nuestro formulario de contacto. Un miembro de nuestro equipo te contactará pronto.',
  'inventario': 'Nuestro sistema de inventario te permite controlar stock en tiempo real, recibir alertas de productos bajos, generar reportes y mucho más. ¿Te gustaría ver una demostración?',
  'ayuda': 'Estoy aquí para ayudarte. Puedes preguntarme sobre:\n• Precios y planes\n• Funcionalidades del sistema\n• Cómo solicitar una demo\n• Soporte técnico',
  'gracias': '¡De nada! 😊 Si tienes más preguntas, no dudes en escribir. ¡Estamos para ayudarte!',
  'tienda': 'Con Supplie.me puedes crear tu tienda virtual y vender en línea las 24 horas. Tus clientes podrán ver productos, hacer pedidos y coordinar entregas.',
  'contacto': 'Puedes contactarnos por:\n📧 Email: contacto@supplie.me\n📱 WhatsApp: +52 55 1234 5678\n🌐 Web: supplie.me/contacto',
  'default': 'Gracias por tu mensaje. Un miembro de nuestro equipo te responderá pronto. Mientras tanto, ¿puedo ayudarte con información sobre nuestros servicios?'
};

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  for (const [keyword, response] of Object.entries(botResponses)) {
    if (keyword !== 'default' && lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  return botResponses['default'];
}

// GET - Obtener mensajes del chat
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '50');

    const messages = await prisma.chatMessage.findMany({
      where: userId ? { userId } : {},
      orderBy: { createdAt: 'asc' },
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return NextResponse.json(
      { error: 'Error al obtener mensajes' },
      { status: 500 }
    );
  }
}

// POST - Enviar un mensaje al chat
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, userId, sender = 'USER' } = body;

    // Guardar mensaje del usuario
    const userMessage = await prisma.chatMessage.create({
      data: {
        content,
        sender: sender as MessageSender,
        userId: userId || null,
      },
    });

    // Si es un mensaje del usuario, generar respuesta del bot
    if (sender === 'USER') {
      const botResponse = getBotResponse(content);
      
      // Pequeño delay para simular que el bot está escribiendo
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const botMessage = await prisma.chatMessage.create({
        data: {
          content: botResponse,
          sender: MessageSender.BOT,
          userId: null,
        },
      });

      return NextResponse.json({
        userMessage,
        botMessage
      }, { status: 201 });
    }

    return NextResponse.json({ userMessage }, { status: 201 });
  } catch (error) {
    console.error('Error sending chat message:', error);
    return NextResponse.json(
      { error: 'Error al enviar mensaje' },
      { status: 500 }
    );
  }
}

