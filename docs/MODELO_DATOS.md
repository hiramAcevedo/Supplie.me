# Modelo de Datos - Supplie.me

## Diagrama Entidad-Relación

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              SUPPLIE.ME - BASE DE DATOS                          │
│                                    PostgreSQL                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   USUARIOS                                       │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│        User          │     │    UserAddress       │     │ UserPaymentMethod    │
├──────────────────────┤     ├──────────────────────┤     ├──────────────────────┤
│ id (PK)              │──┐  │ id (PK)              │     │ id (PK)              │
│ email (unique)       │  │  │ alias                │     │ alias                │
│ password             │  │  │ street               │     │ cardType (enum)      │
│ name                 │  │  │ number               │     │ lastFourDigits       │
│ role (enum)          │  ├─►│ neighborhood         │     │ cardHolder           │
│ avatar               │  │  │ city                 │     │ expiryMonth          │
│ phone                │  │  │ state                │     │ expiryYear           │
│ createdAt            │  │  │ zipCode              │     │ isDefault            │
│ updatedAt            │  │  │ reference            │◄────│ userId (FK)          │
└──────────────────────┘  │  │ isDefault            │     │ createdAt            │
         │                │  │ userId (FK)          │     │ updatedAt            │
         │                │  │ createdAt            │     └──────────────────────┘
         │                │  │ updatedAt            │
         │                │  └──────────────────────┘
         │                │
         ▼                │
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   PRODUCTOS                                      │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│      Category        │     │       Product        │     │    ProductImage      │
├──────────────────────┤     ├──────────────────────┤     ├──────────────────────┤
│ id (PK)              │     │ id (PK)              │──┐  │ id (PK)              │
│ name (unique)        │◄────│ name                 │  │  │ url                  │
│ description          │     │ description          │  │  │ alt                  │
│ image                │     │ price                │  ├─►│ order                │
│ createdAt            │     │ image                │  │  │ productId (FK)       │
│ updatedAt            │     │ stock                │  │  │ createdAt            │
└──────────────────────┘     │ rating               │  │  └──────────────────────┘
                             │ reviewCount          │  │
                             │ discountPercent      │  │  ┌──────────────────────┐
                             │ isActive             │  │  │   ProductReview      │
                             │ sku (unique)         │  │  ├──────────────────────┤
                             │ barcode              │  │  │ id (PK)              │
                             │ unit                 │  │  │ rating (1-5)         │
                             │ categoryId (FK)      │  ├─►│ comment              │
                             │ createdAt            │  │  │ helpful              │
                             │ updatedAt            │  │  │ verified             │
                             └──────────────────────┘  │  │ productId (FK)       │
                                      │                │  │ userId (FK)          │
                                      │                │  │ createdAt            │
                                      ▼                │  │ updatedAt            │
┌──────────────────────┐                              │  └──────────────────────┘
│      CartItem        │                              │           │
├──────────────────────┤                              │           ▼
│ id (PK)              │                              │  ┌──────────────────────┐
│ quantity             │                              │  │     ReviewLike       │
│ userId (FK)          │◄─────────────────────────────┘  ├──────────────────────┤
│ productId (FK)       │                                 │ id (PK)              │
│ createdAt            │                                 │ reviewId (FK)        │
│ updatedAt            │                                 │ userId (FK)          │
│ (unique: user+prod)  │                                 │ createdAt            │
└──────────────────────┘                                 │ (unique: review+user)│
                                                         └──────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                    ÓRDENES                                       │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐     ┌──────────────────────┐
│        Order         │     │      OrderItem       │
├──────────────────────┤     ├──────────────────────┤
│ id (PK)              │──┐  │ id (PK)              │
│ orderNumber (unique) │  │  │ quantity             │
│ status (enum)        │  │  │ price                │
│ subtotal             │  ├─►│ orderId (FK)         │
│ tax                  │  │  │ productId (FK)       │
│ shipping             │  │  │ createdAt            │
│ total                │  │  └──────────────────────┘
│ paymentMethod (enum) │  │
│ shippingAddress      │  │
│ notes                │  │
│ userId (FK)          │  │
│ createdAt            │  │
│ updatedAt            │  │
└──────────────────────┘  │
                          │
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                     CHAT                                         │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│    ChatMessage       │
├──────────────────────┤
│ id (PK)              │
│ content              │
│ sender (enum)        │  ← USER | BOT | AGENT
│ isRead               │
│ userId (FK)          │
│ createdAt            │
└──────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              FAQ (FORO DE PREGUNTAS)                             │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│    FAQCategory       │     │    FAQQuestion       │     │    FAQComment        │
├──────────────────────┤     ├──────────────────────┤     ├──────────────────────┤
│ id (PK)              │     │ id (PK)              │──┐  │ id (PK)              │
│ name (unique)        │◄────│ question             │  │  │ content              │
│ description          │     │ answer               │  │  │ likes                │
│ icon                 │     │ isAnswered           │  ├─►│ questionId (FK)      │
│ order                │     │ isPublic             │  │  │ userId (FK)          │
│ createdAt            │     │ views                │  │  │ createdAt            │
│ updatedAt            │     │ likes                │  │  │ updatedAt            │
└──────────────────────┘     │ categoryId (FK)      │  │  └──────────────────────┘
                             │ userId (FK)          │  │
                             │ createdAt            │  │
                             │ updatedAt            │  │
                             └──────────────────────┘  │
                                                       │
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            FORMULARIO DE CONTACTO                                │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│   ContactMessage     │
├──────────────────────┤
│ id (PK)              │
│ name                 │
│ email                │
│ phone                │
│ interest (enum)      │  ← DEMO | BETA_TESTER | COLLABORATION | INFO | OTHER
│ message              │
│ status (enum)        │  ← PENDING | READ | REPLIED | ARCHIVED
│ notes                │
│ repliedAt            │
│ userId (FK)          │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘
```

---

## Resumen de Tablas

| # | Tabla | Descripción | Registros Estimados |
|---|-------|-------------|---------------------|
| 1 | `users` | Usuarios del sistema (clientes y admins) | ~100-1000 |
| 2 | `user_addresses` | Direcciones de envío de usuarios | ~200-2000 |
| 3 | `user_payment_methods` | Métodos de pago guardados | ~100-1000 |
| 4 | `categories` | Categorías de productos | ~10-20 |
| 5 | `products` | Catálogo de productos | ~50-500 |
| 6 | `product_images` | Galería de imágenes por producto | ~100-1000 |
| 7 | `product_reviews` | Reseñas y calificaciones | ~200-5000 |
| 8 | `review_likes` | Likes en reseñas | ~500-10000 |
| 9 | `cart_items` | Items en carritos activos | ~50-500 |
| 10 | `orders` | Pedidos realizados | ~100-5000 |
| 11 | `order_items` | Items por pedido | ~300-15000 |
| 12 | `chat_messages` | Mensajes del chat | ~500-10000 |
| 13 | `faq_categories` | Categorías de FAQ | ~4-10 |
| 14 | `faq_questions` | Preguntas frecuentes | ~20-100 |
| 15 | `faq_comments` | Comentarios en FAQ | ~50-500 |
| 16 | `contact_messages` | Mensajes de contacto | ~50-500 |

**Total: 16 tablas**

---

## Enums (Tipos Enumerados)

### UserRole
```sql
CUSTOMER    -- Cliente regular
ADMIN       -- Administrador de tienda
SUPERADMIN  -- Super administrador del sistema
```

### PaymentCardType
```sql
VISA
MASTERCARD
AMEX
OTHER
```

### OrderStatus
```sql
PENDING     -- Pendiente de confirmación
CONFIRMED   -- Confirmado
PREPARING   -- En preparación
SHIPPED     -- Enviado
DELIVERED   -- Entregado
CANCELLED   -- Cancelado
```

### PaymentMethod
```sql
CASH        -- Efectivo
CARD        -- Tarjeta
TRANSFER    -- Transferencia
STORE       -- Pago en tienda
```

### MessageSender
```sql
USER        -- Mensaje del usuario
BOT         -- Respuesta automática del bot
AGENT       -- Respuesta de un agente humano
```

### ContactInterest
```sql
DEMO          -- Quiere ver una demo
BETA_TESTER   -- Quiere ser beta tester
COLLABORATION -- Quiere colaborar en el desarrollo
INFO          -- Solo quiere información
OTHER         -- Otro
```

### ContactStatus
```sql
PENDING   -- Pendiente de leer
READ      -- Leído
REPLIED   -- Respondido
ARCHIVED  -- Archivado
```

---

## Relaciones Principales

### Usuario → Múltiples Entidades
- Un usuario puede tener **múltiples direcciones**
- Un usuario puede tener **múltiples métodos de pago**
- Un usuario puede tener **múltiples items en carrito**
- Un usuario puede hacer **múltiples pedidos**
- Un usuario puede escribir **múltiples reseñas** (una por producto)
- Un usuario puede dar **múltiples likes** en reseñas
- Un usuario puede enviar **múltiples mensajes de chat**
- Un usuario puede hacer **múltiples preguntas FAQ**
- Un usuario puede escribir **múltiples comentarios FAQ**
- Un usuario puede enviar **múltiples mensajes de contacto**

### Producto → Múltiples Entidades
- Un producto pertenece a **una categoría**
- Un producto puede tener **múltiples imágenes**
- Un producto puede tener **múltiples reseñas**
- Un producto puede estar en **múltiples carritos**
- Un producto puede estar en **múltiples pedidos**

### Pedido → Items
- Un pedido tiene **múltiples items**
- Cada item referencia un producto y guarda el precio al momento de la compra

### FAQ → Comentarios
- Una pregunta FAQ puede tener **múltiples comentarios**

---

## Índices y Constraints

### Unique Constraints
- `users.email` - Email único por usuario
- `categories.name` - Nombre de categoría único
- `products.sku` - SKU único por producto
- `orders.orderNumber` - Número de orden único
- `faq_categories.name` - Nombre de categoría FAQ único
- `cart_items(userId, productId)` - Un item por producto por usuario
- `product_reviews(productId, userId)` - Una reseña por producto por usuario
- `review_likes(reviewId, userId)` - Un like por reseña por usuario

### Cascadas (onDelete)
- Al eliminar usuario: se eliminan direcciones, métodos de pago, carrito, reseñas, likes
- Al eliminar producto: se eliminan imágenes, reseñas, items de carrito
- Al eliminar pedido: se eliminan items del pedido
- Al eliminar reseña: se eliminan likes de la reseña
- Al eliminar pregunta FAQ: se eliminan comentarios

---

## Datos Iniciales (Seeds)

### Usuarios de Prueba
| Email | Contraseña | Rol | Descripción |
|-------|------------|-----|-------------|
| admin@supplie.me | admin123 | SUPERADMIN | Administrador general |
| admin2@supplie.me | admin | ADMIN | Asesor administrador |
| usuario@supplie.me | usuario123 | CUSTOMER | Usuario demo |
| cliente@supplie.me | cliente123 | CUSTOMER | Cliente ejemplo |

### Categorías
- Lácteos, Panadería, Frutas, Verduras, Abarrotes
- Conservas, Limpieza, Hogar, Bebidas, Carnes

### Productos
20 productos iniciales distribuidos en las categorías

### FAQ
4 categorías con 12 preguntas frecuentes

---

*Documento generado automáticamente - Supplie.me v2.0*

