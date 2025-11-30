# Supplie.me - Sistema de Comercio Electrónico

## Descripción del Proyecto

**MiniSuper Web** es una aplicación web de comercio electrónico desarrollada como prototipo de un mini supermercado en línea. La aplicación permite a los usuarios explorar productos, gestionar un carrito de compras, realizar pedidos y administrar su cuenta de usuario.

### Características Principales

- 🛒 **Carrito de Compras Inteligente**: Gestión completa de productos con persistencia de datos
- 🔐 **Sistema de Autenticación**: Login seguro con roles de usuario (cliente/administrador)
- 📱 **Diseño Responsivo**: Interfaz adaptada para dispositivos móviles y de escritorio
- 🎨 **UI Moderna**: Interfaz de usuario construida con Material-UI
- ⚡ **Rendimiento Optimizado**: Desarrollado con Next.js 15 y React 19
- 🗄️ **Gestión de Estado**: Estado global con Zustand para una experiencia fluida

## Tecnologías Utilizadas

### Frontend
- **Next.js 15**: Framework de React con App Router
- **React 19**: Biblioteca de interfaz de usuario
- **TypeScript**: Tipado estático para mayor robustez
- **Material-UI (MUI)**: Sistema de componentes de diseño
- **Emotion**: Solución de CSS-in-JS

### Gestión de Estado
- **Zustand**: Gestión de estado global ligera y eficiente
- **Persistencia**: Almacenamiento local con localStorage

### Autenticación
- **NextAuth.js**: Sistema de autenticación completo
- **JWT**: Tokens de autenticación seguros

### Herramientas de Desarrollo
- **ESLint**: Linting de código
- **Turbopack**: Bundler rápido para desarrollo

## Estructura del Proyecto

```
frontend/
├── app/                    # Páginas de la aplicación (App Router)
│   ├── page.tsx           # Página principal
│   ├── products/          # Catálogo de productos
│   ├── cart/              # Carrito de compras
│   ├── login/             # Autenticación
│   ├── admin/             # Panel de administración
│   ├── profile/           # Perfil de usuario
│   └── [páginas info]/    # Páginas informativas
├── components/             # Componentes reutilizables
│   ├── layout/            # Componentes de estructura
│   ├── ui/                # Componentes de interfaz
│   └── auth/              # Componentes de autenticación
├── store/                  # Stores de estado (Zustand)
│   ├── productStore.ts    # Gestión de productos
│   ├── cartStore.ts       # Estado del carrito
│   └── authStore.ts       # Autenticación y usuarios
└── public/                 # Archivos estáticos e imágenes
```

## Funcionalidades Implementadas

### Para Usuarios
- ✅ Navegación por catálogo de productos
- ✅ Búsqueda y filtrado de productos
- ✅ Carrito de compras persistente
- ✅ Sistema de autenticación
- ✅ Perfil de usuario
- ✅ Historial de pedidos

### Para Administradores
- ✅ Panel de administración
- ✅ Gestión de productos
- ✅ Control de inventario
- ✅ Estadísticas de ventas
- ✅ Gestión de usuarios

## Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd MiniSuperWeb/apps/frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

- `npm run dev`: Servidor de desarrollo con Turbopack
- `npm run build`: Construcción para producción
- `npm run start`: Servidor de producción
- `npm run lint`: Verificación de código

## Arquitectura del Sistema

### Patrón de Diseño
La aplicación sigue un patrón de arquitectura basado en componentes con separación clara de responsabilidades:

- **Presentación**: Componentes React con Material-UI
- **Lógica de Negocio**: Stores de Zustand
- **Persistencia**: localStorage y APIs externas
- **Ruteo**: Next.js App Router

### Gestión de Estado
Utilizamos Zustand para la gestión de estado global, organizado en tres stores principales:

1. **ProductStore**: Catálogo, categorías y búsquedas
2. **CartStore**: Carrito de compras y checkout
3. **AuthStore**: Autenticación y sesiones de usuario

### Seguridad
- Autenticación basada en JWT
- Protección de rutas privadas
- Validación de roles de usuario
- Persistencia segura de sesiones

## Características Técnicas

### Rendimiento
- **SSR/SSG**: Renderizado del lado del servidor
- **Code Splitting**: Carga diferida de componentes
- **Image Optimization**: Optimización automática de imágenes
- **Bundle Optimization**: Minimización y compresión

### Responsividad
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: Adaptación a diferentes tamaños de pantalla
- **Touch Friendly**: Interfaz táctil optimizada

### Accesibilidad
- **Semantic HTML**: Estructura semántica correcta
- **ARIA Labels**: Etiquetas de accesibilidad
- **Keyboard Navigation**: Navegación por teclado
- **Screen Reader Support**: Compatibilidad con lectores de pantalla

## Roadmap y Futuras Mejoras

### Fase 2 - Integración Backend
- [ ] API REST completa
- [ ] Base de datos PostgreSQL
- [ ] Sistema de pagos
- [ ] Notificaciones en tiempo real

### Fase 3 - Funcionalidades Avanzadas
- [ ] Sistema de reseñas y calificaciones
- [ ] Programa de fidelización
- [ ] Integración con redes sociales
- [ ] Aplicación móvil nativa

### Fase 4 - Escalabilidad
- [ ] Microservicios
- [ ] Cache distribuido
- [ ] CDN global
- [ ] Monitoreo y analytics

## Contribución

Este es un proyecto educativo desarrollado como prototipo. Las contribuciones son bienvenidas para mejorar la funcionalidad y la experiencia del usuario.

### Guías de Contribución
1. Fork del repositorio
2. Crear una rama para tu feature
3. Commit de tus cambios
4. Push a la rama
5. Crear un Pull Request

## Licencia

Este proyecto está desarrollado con fines educativos y de demostración.

## Contacto

Para más información sobre el proyecto o colaboraciones, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ usando Next.js, React y Material-UI**
