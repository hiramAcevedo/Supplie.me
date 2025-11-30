import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // ============================================
  // CREAR CATEGORÍAS
  // ============================================
  console.log('📦 Creando categorías...');
  
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Lácteos' },
      update: {},
      create: { name: 'Lácteos', description: 'Productos lácteos frescos' }
    }),
    prisma.category.upsert({
      where: { name: 'Panadería' },
      update: {},
      create: { name: 'Panadería', description: 'Pan y productos horneados' }
    }),
    prisma.category.upsert({
      where: { name: 'Frutas' },
      update: {},
      create: { name: 'Frutas', description: 'Frutas frescas de temporada' }
    }),
    prisma.category.upsert({
      where: { name: 'Verduras' },
      update: {},
      create: { name: 'Verduras', description: 'Verduras frescas' }
    }),
    prisma.category.upsert({
      where: { name: 'Abarrotes' },
      update: {},
      create: { name: 'Abarrotes', description: 'Productos básicos de despensa' }
    }),
    prisma.category.upsert({
      where: { name: 'Conservas' },
      update: {},
      create: { name: 'Conservas', description: 'Productos enlatados y conservas' }
    }),
    prisma.category.upsert({
      where: { name: 'Limpieza' },
      update: {},
      create: { name: 'Limpieza', description: 'Productos de limpieza del hogar' }
    }),
    prisma.category.upsert({
      where: { name: 'Hogar' },
      update: {},
      create: { name: 'Hogar', description: 'Artículos para el hogar' }
    }),
    prisma.category.upsert({
      where: { name: 'Bebidas' },
      update: {},
      create: { name: 'Bebidas', description: 'Refrescos, jugos y bebidas' }
    }),
    prisma.category.upsert({
      where: { name: 'Carnes' },
      update: {},
      create: { name: 'Carnes', description: 'Carnes frescas y embutidos' }
    })
  ]);

  const categoryMap = Object.fromEntries(categories.map(c => [c.name, c.id]));
  console.log(`✅ ${categories.length} categorías creadas`);

  // ============================================
  // CREAR USUARIOS
  // ============================================
  console.log('👤 Creando usuarios...');

  const users = await Promise.all([
    // Superadmin
    prisma.user.upsert({
      where: { email: 'admin@supplie.me' },
      update: {},
      create: {
        email: 'admin@supplie.me',
        password: await hashPassword('admin123'),
        name: 'Administrador General',
        role: UserRole.SUPERADMIN,
        avatar: '/supplie-me_logo.png'
      }
    }),
    // Admin (Asesor)
    prisma.user.upsert({
      where: { email: 'admin2@supplie.me' },
      update: {},
      create: {
        email: 'admin2@supplie.me',
        password: await hashPassword('admin'),
        name: 'Asesor Administrador',
        role: UserRole.ADMIN,
        avatar: '/supplie-me_logo.png'
      }
    }),
    // Usuario Demo
    prisma.user.upsert({
      where: { email: 'usuario@supplie.me' },
      update: {},
      create: {
        email: 'usuario@supplie.me',
        password: await hashPassword('usuario123'),
        name: 'Usuario Demo',
        role: UserRole.CUSTOMER,
        avatar: '/dogactually.webp'
      }
    }),
    // Cliente Ejemplo
    prisma.user.upsert({
      where: { email: 'cliente@supplie.me' },
      update: {},
      create: {
        email: 'cliente@supplie.me',
        password: await hashPassword('cliente123'),
        name: 'Cliente Ejemplo',
        role: UserRole.CUSTOMER,
        avatar: '/dogactually.webp'
      }
    })
  ]);

  console.log(`✅ ${users.length} usuarios creados`);

  // ============================================
  // CREAR PRODUCTOS
  // ============================================
  console.log('🛒 Creando productos...');

  const productsData = [
    { name: 'Leche Entera', price: 24.50, image: '/leche1.webp', category: 'Lácteos', rating: 4.5, description: 'Leche entera de alta calidad', stock: 50, discountPercent: 10 },
    { name: 'Pan Integral', price: 35.00, image: '/panela.webp', category: 'Panadería', rating: 4.3, description: 'Pan integral recién horneado', stock: 30, discountPercent: 5 },
    { name: 'Huevos', price: 48.00, image: '/huevo.jpeg', category: 'Lácteos', rating: 4.8, description: 'Huevos frescos de gallinas de corral', stock: 100 },
    { name: 'Manzanas', price: 45.50, image: '/manzana.avif', category: 'Frutas', rating: 4.6, description: 'Manzanas rojas frescas', stock: 80, discountPercent: 15 },
    { name: 'Arroz', price: 28.00, image: '/arroz.jpg', category: 'Abarrotes', rating: 4.7, description: 'Arroz blanco premium', stock: 120 },
    { name: 'Tortillas', price: 18.50, image: '/tortillas.jpeg', category: 'Abarrotes', rating: 4.4, description: 'Tortillas de maíz recién hechas', stock: 90, discountPercent: 8 },
    { name: 'Crema', price: 22.00, image: '/creama1.webp', category: 'Lácteos', rating: 4.2, description: 'Crema para cocinar de excelente calidad', stock: 60 },
    { name: 'Jabón para Ropa', price: 55.00, image: '/jabon_polvo.webp', category: 'Limpieza', rating: 4.1, description: 'Jabón biodegradable para todo tipo de ropa', stock: 40, discountPercent: 20 },
    { name: 'Escoba', price: 65.00, image: '/mini_escoba.jpeg', category: 'Hogar', rating: 4.9, description: 'Escoba resistente y duradera', stock: 70 },
    { name: 'Coca Cola', price: 32.00, image: '/cocacola.jpg', category: 'Bebidas', rating: 4.0, description: 'Refresco de cola en botella de 2 litros', stock: 100, discountPercent: 12 },
    { name: 'Agua Mineral', price: 15.00, image: '/topochico.jpeg', category: 'Bebidas', rating: 4.3, description: 'Agua mineral natural sin gas', stock: 150 },
    { name: 'Pollo', price: 110.00, image: '/pollopechuga.jpeg', category: 'Carnes', rating: 4.7, description: 'Pollo entero fresco de granja', stock: 25, discountPercent: 18 },
    { name: 'Bistec de Res', price: 140.00, image: '/bistec.jpg', category: 'Carnes', rating: 4.8, description: 'Bistec de res de primera calidad', stock: 15, discountPercent: 10 },
    { name: 'Costillas', price: 125.00, image: '/costillas.jpeg', category: 'Carnes', rating: 4.6, description: 'Costillas de cerdo para asar', stock: 20 },
    { name: 'Plátano', price: 18.00, image: '/platano.png', category: 'Frutas', rating: 4.5, description: 'Plátano maduro y fresco', stock: 100, discountPercent: 5 },
    { name: 'Sandía', price: 35.00, image: '/sandia.jpg', category: 'Frutas', rating: 4.4, description: 'Sandía jugosa y dulce', stock: 25 },
    { name: 'Queso para Fundir', price: 85.00, image: '/quesofundir.jpeg', category: 'Lácteos', rating: 4.6, description: 'Queso ideal para fundir en sus platillos', stock: 30, discountPercent: 15 },
    { name: 'Monster Energy', price: 38.00, image: '/monster.jpg', category: 'Bebidas', rating: 4.1, description: 'Bebida energética Monster', stock: 40 },
    { name: 'Limpiador de Pisos', price: 28.00, image: '/fabuloso_pisos.jpeg', category: 'Limpieza', rating: 4.3, description: 'Limpiador multiusos con aroma fresco', stock: 55, discountPercent: 7 },
    { name: 'Cloro', price: 18.50, image: '/cloro.webp', category: 'Limpieza', rating: 4.2, description: 'Cloro desinfectante para el hogar', stock: 60 }
  ];

  for (const productData of productsData) {
    await prisma.product.upsert({
      where: { sku: productData.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        name: productData.name,
        price: productData.price,
        image: productData.image,
        categoryId: categoryMap[productData.category],
        rating: productData.rating,
        description: productData.description,
        stock: productData.stock,
        discountPercent: productData.discountPercent || 0,
        sku: productData.name.toLowerCase().replace(/\s+/g, '-')
      }
    });
  }

  console.log(`✅ ${productsData.length} productos creados`);

  // ============================================
  // CREAR CATEGORÍAS DE FAQ
  // ============================================
  console.log('❓ Creando categorías de FAQ...');

  const faqCategories = await Promise.all([
    prisma.fAQCategory.upsert({
      where: { name: 'General' },
      update: {},
      create: { name: 'General', description: 'Preguntas generales sobre Supplie.me', icon: 'HelpOutline', order: 1 }
    }),
    prisma.fAQCategory.upsert({
      where: { name: 'Funcionalidades' },
      update: {},
      create: { name: 'Funcionalidades', description: 'Características y funciones del sistema', icon: 'Inventory', order: 2 }
    }),
    prisma.fAQCategory.upsert({
      where: { name: 'Precios y Pagos' },
      update: {},
      create: { name: 'Precios y Pagos', description: 'Información sobre costos y métodos de pago', icon: 'Payment', order: 3 }
    }),
    prisma.fAQCategory.upsert({
      where: { name: 'Soporte y Seguridad' },
      update: {},
      create: { name: 'Soporte y Seguridad', description: 'Ayuda técnica y seguridad de datos', icon: 'Support', order: 4 }
    })
  ]);

  const faqCategoryMap = Object.fromEntries(faqCategories.map(c => [c.name, c.id]));
  console.log(`✅ ${faqCategories.length} categorías de FAQ creadas`);

  // ============================================
  // CREAR PREGUNTAS FRECUENTES
  // ============================================
  console.log('💬 Creando preguntas frecuentes...');

  const faqData = [
    { category: 'General', question: '¿Qué es Supplie.me?', answer: 'Supplie.me es una plataforma tecnológica diseñada para empoderar a dueños de tiendas de abarrotes y pequeños comercios. Ofrecemos un sistema integral que incluye gestión de inventario, punto de venta, tienda virtual y herramientas de análisis para hacer crecer tu negocio.' },
    { category: 'General', question: '¿Para quién está diseñado Supplie.me?', answer: 'Supplie.me está diseñado principalmente para tiendas de abarrotes, misceláneas, minimercados y pequeños comercios que quieran digitalizar su operación y tener un mejor control de su negocio.' },
    { category: 'General', question: '¿Cómo puedo empezar a usar Supplie.me?', answer: 'Es muy fácil. Puedes solicitar una demo gratuita desde nuestra página de contacto. Un miembro de nuestro equipo te contactará para mostrarte la plataforma y ayudarte a configurar tu tienda.' },
    { category: 'Funcionalidades', question: '¿Qué incluye el sistema de inventario?', answer: 'Nuestro sistema de inventario te permite registrar todos tus productos, controlar el stock en tiempo real, recibir alertas cuando los productos estén por agotarse, generar reportes de movimientos y mantener un historial completo de todas las transacciones.' },
    { category: 'Funcionalidades', question: '¿Puedo vender en línea con Supplie.me?', answer: 'Sí, Supplie.me incluye una tienda virtual integrada donde tus clientes pueden ver tus productos, hacer pedidos y coordinar la entrega o recogida. Tu tienda estará disponible 24/7 sin necesidad de conocimientos técnicos.' },
    { category: 'Funcionalidades', question: '¿Funciona en dispositivos móviles?', answer: 'Absolutamente. Supplie.me está diseñado con un enfoque mobile-first, lo que significa que funciona perfectamente en smartphones, tablets y computadoras.' },
    { category: 'Precios y Pagos', question: '¿Cuánto cuesta Supplie.me?', answer: 'Actualmente estamos en fase de lanzamiento y ofrecemos acceso gratuito a nuestros beta testers. Próximamente lanzaremos planes accesibles diseñados específicamente para pequeños comerciantes.' },
    { category: 'Precios y Pagos', question: '¿Qué métodos de pago aceptan mis clientes?', answer: 'La tienda virtual de Supplie.me permite que tus clientes paguen en efectivo al recibir, transferencia bancaria, o pago en tienda. Próximamente integraremos pagos con tarjeta.' },
    { category: 'Precios y Pagos', question: '¿Hay costos ocultos o comisiones por venta?', answer: 'No. En Supplie.me creemos en la transparencia total. Los costos de la plataforma son fijos y no cobramos comisiones por cada venta que realices.' },
    { category: 'Soporte y Seguridad', question: '¿Mis datos están seguros?', answer: 'La seguridad es nuestra prioridad. Utilizamos encriptación de datos, respaldos automáticos diarios y servidores seguros para proteger toda la información de tu negocio.' },
    { category: 'Soporte y Seguridad', question: '¿Qué tipo de soporte ofrecen?', answer: 'Ofrecemos soporte por email, WhatsApp y chat en vivo durante horario de oficina (Lunes a Viernes 9:00 AM - 6:00 PM). También contamos con una base de conocimientos con tutoriales y guías.' },
    { category: 'Soporte y Seguridad', question: '¿Qué pasa si tengo un problema técnico?', answer: 'Nuestro equipo de soporte está disponible para ayudarte. Puedes reportar cualquier problema a través de contacto@supplie.me o mediante el chat integrado en la plataforma.' }
  ];

  for (const faq of faqData) {
    await prisma.fAQQuestion.create({
      data: {
        question: faq.question,
        answer: faq.answer,
        categoryId: faqCategoryMap[faq.category],
        isAnswered: true,
        isPublic: true
      }
    });
  }

  console.log(`✅ ${faqData.length} preguntas frecuentes creadas`);

  console.log('\n🎉 Seed completado exitosamente!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error en seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

