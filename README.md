# Supplie.me

> **Empoderamos tu tienda con tecnología inteligente**

## Descripción del Proyecto

**Supplie.me** es una plataforma tecnológica integral diseñada para empoderar a dueños de tiendas de abarrotes y pequeños comercios en México. Ofrecemos herramientas de digitalización que permiten gestionar inventario, vender en línea y administrar el negocio de manera inteligente.

Este proyecto nació en el Centro Universitario de Ciencias Exactas e Ingenierías (CUCEI) de la Universidad de Guadalajara, con la visión de cerrar la brecha tecnológica para los comerciantes tradicionales.

### Problema que Resolvemos

Los comerciantes locales enfrentan:
- Dificultad para controlar su inventario manualmente
- Pérdida de ventas por no tener presencia digital
- Competencia con grandes cadenas que ya están digitalizadas
- Falta de herramientas accesibles y fáciles de usar

### Nuestra Solución

Supplie.me ofrece una suite completa de herramientas:

- **Control de Inventario** - Gestión de stock en tiempo real con alertas de productos bajos
- **Tienda Virtual** - Tu negocio disponible 24/7 para tus clientes
- **Punto de Venta** - Ventas rápidas y sencillas desde cualquier dispositivo
- **Gestión de Entregas** - Administración de pedidos a domicilio
- **Panel de Administración** - Control total de tu negocio en un solo lugar
- **Asistente Virtual** - ChatBot para atención al cliente automatizada

## Características Principales

### Para Comerciantes
- Catálogo de productos con imágenes, precios y descripciones
- Carrito de compras persistente para clientes
- Sistema de órdenes con seguimiento de estado
- Múltiples métodos de pago (efectivo, tarjeta, transferencia)
- Gestión de direcciones de entrega
- Reseñas y calificaciones de productos

### Para Administradores
- Dashboard con métricas del negocio
- CRUD completo de productos y categorías
- Control de usuarios y roles (Cliente, Admin, SuperAdmin)
- Gestión de órdenes y estados
- Sistema de FAQ para preguntas frecuentes
- Mensajes de contacto de clientes potenciales

### Experiencia de Usuario
- Diseño responsivo (Mobile First)
- UI moderna con Material-UI
- Búsqueda y filtrado avanzado de productos
- ChatBot de asistencia integrado
- Galería de imágenes de productos
- Sistema de autenticación seguro

## Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Next.js** | 15.x | Framework React con App Router |
| **React** | 19.x | Biblioteca de UI |
| **TypeScript** | 5.x | Tipado estático |
| **Material-UI** | 7.x | Sistema de componentes de diseño |
| **Emotion** | 11.x | CSS-in-JS |

### Backend & Base de Datos
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Prisma** | 5.x | ORM para base de datos |
| **PostgreSQL** | - | Base de datos relacional |
| **bcryptjs** | 3.x | Encriptación de contraseñas |
| **NextAuth.js** | 4.x | Sistema de autenticación |

### Gestión de Estado
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Zustand** | 5.x | Estado global ligero |
| **localStorage** | - | Persistencia del carrito |

### Herramientas de Desarrollo
| Tecnología | Descripción |
|------------|-------------|
| **Turbopack** | Bundler rápido para desarrollo |
| **ESLint** | Linting de código |
| **tsx** | Ejecución de TypeScript |

## Estructura del Proyecto

```
Supplie.me/
├── app/                          # Páginas (App Router)
│   ├── page.tsx                  # Página principal (Home)
│   ├── about/                    # Quiénes somos
│   ├── contact/                  # Contacto / Solicitar demo
│   ├── products/                 # Catálogo de productos
│   │   └── [id]/                 # Detalle de producto
│   ├── cart/                     # Carrito de compras
│   ├── checkout/                 # Proceso de compra
│   ├── login/                    # Autenticación
│   ├── profile/                  # Perfil de usuario
│   ├── faq/                      # Preguntas frecuentes
│   ├── admin/                    # Panel de administración
│   │   ├── login/                # Login de admin
│   │   └── products/             # Gestión de productos
│   └── api/                      # API Routes
│       ├── auth/                 # Autenticación
│       ├── products/             # CRUD productos
│       ├── categories/           # Categorías
│       ├── faq/                  # FAQ
│       └── chat/                 # Chat
├── components/                   # Componentes reutilizables
│   ├── layout/                   # Navbar, Footer
│   ├── ui/                       # Componentes de interfaz
│   └── auth/                     # Protección de rutas
├── store/                        # Stores de Zustand
│   ├── productStore.ts           # Productos y catálogo
│   ├── cartStore.ts              # Carrito de compras
│   └── authStore.ts              # Autenticación
├── lib/                          # Utilidades
│   └── prisma.ts                 # Cliente de Prisma
├── prisma/                       # Base de datos
│   ├── schema.prisma             # Modelo de datos
│   ├── seed.ts                   # Datos de ejemplo
│   └── migrations/               # Migraciones
└── public/                       # Assets estáticos
```

## Modelo de Datos

El sistema cuenta con un modelo de datos completo para comercio electrónico:

### Entidades Principales
- **User** - Usuarios con roles (Cliente, Admin, SuperAdmin)
- **Product** - Productos con SKU, código de barras, stock
- **Category** - Categorías de productos
- **Order** - Órdenes con estados de seguimiento
- **CartItem** - Items del carrito de compras

### Entidades de Soporte
- **UserAddress** - Direcciones de entrega
- **UserPaymentMethod** - Métodos de pago
- **ProductImage** - Galería de imágenes
- **ProductReview** - Reseñas con calificaciones
- **FAQQuestion/FAQComment** - Sistema de FAQ
- **ChatMessage** - Historial de chat
- **ContactMessage** - Mensajes de contacto

## Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- PostgreSQL (local o remoto)
- npm, yarn, pnpm o bun

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:password@localhost:5432/supplie_me"

# NextAuth
NEXTAUTH_SECRET="tu-secreto-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/Supplie.me.git
   cd Supplie.me
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar base de datos**
   ```bash
   # Generar cliente de Prisma
   npm run db:generate
   
   # Ejecutar migraciones
   npm run db:migrate
   
   # Cargar datos de ejemplo (opcional)
   npm run db:seed
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con Turbopack |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Verificación de código |
| `npm run db:generate` | Genera cliente de Prisma |
| `npm run db:migrate` | Ejecuta migraciones |
| `npm run db:seed` | Carga datos de ejemplo |
| `npm run db:studio` | Abre Prisma Studio |
| `npm run db:reset` | Resetea la base de datos |

## Arquitectura del Sistema

### Patrón de Diseño
Arquitectura basada en componentes con separación clara de responsabilidades:

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTACIÓN                          │
│              Next.js App Router + React                  │
│              Material-UI Components                      │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 GESTIÓN DE ESTADO                        │
│                    Zustand Stores                        │
│         (productStore, cartStore, authStore)             │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                      API LAYER                           │
│                 Next.js API Routes                       │
│                  (/api/products, etc)                    │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                   PERSISTENCIA                           │
│               Prisma ORM + PostgreSQL                    │
└─────────────────────────────────────────────────────────┘
```

### Gestión de Estado (Zustand)

1. **ProductStore** - Catálogo, categorías, búsquedas y filtros
2. **CartStore** - Carrito de compras con persistencia local
3. **AuthStore** - Autenticación, sesiones y roles de usuario

### Seguridad
- Autenticación basada en JWT con NextAuth.js
- Encriptación de contraseñas con bcryptjs
- Protección de rutas privadas (admin, perfil)
- Validación de roles de usuario

## Roadmap

### Fase Actual - MVP Funcional
- [x] Sistema de autenticación
- [x] Catálogo de productos con categorías
- [x] Carrito de compras persistente
- [x] Panel de administración básico
- [x] Sistema de FAQ
- [x] ChatBot de asistencia
- [x] Diseño responsivo

### Próximas Mejoras
- [ ] Integración con pasarelas de pago (Stripe, PayPal)
- [ ] Notificaciones push y por email
- [ ] Sistema de cupones y descuentos
- [ ] Reportes y analíticas avanzadas
- [ ] Integración con WhatsApp Business
- [ ] App móvil nativa (React Native)

### Visión a Largo Plazo
- [ ] Multi-tienda (SaaS)
- [ ] Integración con proveedores
- [ ] Sistema de fidelización
- [ ] IA para predicción de inventario
- [ ] Marketplace de comercios locales

## Demo en Línea

Visita nuestra demostración en vivo: **[supplie.me](https://supplie.me)**

### Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Cliente | cliente@test.com | cliente123 |
| Admin | admin@supplie.me | admin123 |

## Contribución

Este es un proyecto académico abierto a colaboraciones. Si te interesa contribuir:

1. Fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Formas de Contribuir
- Reportar bugs o sugerir mejoras
- Colaborar en el desarrollo
- Ser beta tester
- Ayudar con documentación

## Equipo

Proyecto desarrollado en el **CUCEI - Universidad de Guadalajara** como parte de la materia IH736 Proyecto IV.

## Contacto

- **Web**: [supplie.me/contact](https://supplie.me/contact)
- **Email**: contacto@supplie.me
- **Ubicación**: CUCEI, Universidad de Guadalajara, Jalisco, México

---

<div align="center">

**Supplie.me** - Tu tienda inteligente

Desarrollado con ❤️ en Guadalajara, México

[Next.js](https://nextjs.org/) • [React](https://reactjs.org/) • [Material-UI](https://mui.com/) • [Prisma](https://prisma.io/)

</div>
