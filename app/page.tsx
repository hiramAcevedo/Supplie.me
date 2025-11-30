'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Stack,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import InventoryIcon from '@mui/icons-material/Inventory';
import SpeedIcon from '@mui/icons-material/Speed';
import { useCartStore, CartItem } from '../store/cartStore';
import { useProductStore, Product } from '../store/productStore';

// Imágenes para el carousel
const carouselImages = [
  {
    src: '/supplie_me_logo_150x40.svg',
    alt: 'Supplie.me - Tu tienda inteligente',
    title: '¡Bienvenido a Supplie.me!',
    subtitle: 'Empoderamos tu tienda con tecnología inteligente',
    isLogo: true
  },
  {
    src: '/manzana.avif',
    alt: 'Productos frescos',
    title: 'Gestiona tu inventario fácilmente',
    subtitle: 'Control total de productos y stock en tiempo real',
    isLogo: false
  },
  {
    src: '/pollopechuga.jpeg',
    alt: 'Carnes frescas',
    title: 'Vende más, preocúpate menos',
    subtitle: 'Sistema de punto de venta simple y efectivo',
    isLogo: false
  }
];

// Componente de Carousel
const Carousel = ({ images }: { images: typeof carouselImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box 
      sx={{
        position: 'relative',
        height: {xs: '350px', md: '500px'},
        overflow: 'hidden',
        borderRadius: 4,
        mb: 6,
        background: 'linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FCD34D 100%)'
      }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, gap: 4, px: 4 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, color: 'white', zIndex: 2 }}>
              <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom sx={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                {image.title}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.95, textShadow: '0 1px 5px rgba(0,0,0,0.2)' }}>
                {image.subtitle}
              </Typography>
              {index === 0 && (
                <Button 
                  component={Link}
                  href="/products"
                  variant="contained"
                  size="large"
                  sx={{ 
                    mt: 3, 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    fontWeight: 'bold',
                    px: 4,
                    '&:hover': { bgcolor: 'grey.100' }
                  }}
                >
                  Explorar Tienda
                </Button>
              )}
            </Box>
            <Box sx={{ position: 'relative' }}>
              {image.isLogo ? (
                <Box sx={{ 
                  bgcolor: 'white', 
                  p: 4, 
                  borderRadius: 4, 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={200}
                    height={55}
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </Box>
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={250}
                  height={250}
                  style={{ 
                    objectFit: 'contain', 
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                  }}
                />
              )}
            </Box>
          </Container>
        </Box>
      ))}
      
      {/* Indicadores */}
      <Box 
        sx={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1.5
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: index === currentIndex ? 32 : 12,
              height: 12,
              bgcolor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

// Componente de tarjeta de producto
const FeaturedProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCartStore();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const discountedPrice = product.discountPercent 
    ? product.price * (1 - product.discountPercent/100) 
    : product.price;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: discountedPrice,
      quantity: 1,
      image: product.image,
    };
    
    addItem(cartItem);
    setOpenSnackbar(true);
  };
  
  return (
    <>
      <Card sx={{ height: '100%', borderRadius: 3, overflow: 'hidden' }}>
        <CardActionArea component={Link} href={`/products/${product.id}`}>
          <Box sx={{ position: 'relative', pt: '100%', bgcolor: 'grey.50' }}>
            <CardMedia
              component="div"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
              }}
            >
              <Image
                src={product.image}
                alt={product.name || 'Producto'}
                width={150}
                height={150}
                style={{ objectFit: 'contain' }}
              />
            </CardMedia>
            
            {(product.discountPercent ?? 0) > 0 && (
              <Chip
                label={`-${product.discountPercent}%`}
                color="error"
                size="small"
                sx={{ position: 'absolute', top: 12, right: 12, fontWeight: 'bold' }}
              />
            )}
          </Box>
          
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom noWrap fontWeight="600">
              {product.name}
            </Typography>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                ${discountedPrice.toFixed(2)}
              </Typography>
              
              {(product.discountPercent ?? 0) > 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  ${product.price.toFixed(2)}
                </Typography>
              )}
            </Stack>
          </CardContent>
        </CardActionArea>
        
        <Box sx={{ p: 2, pt: 0 }}>
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<ShoppingCartIcon />} 
            sx={{ borderRadius: 2 }}
            onClick={handleAddToCart}
          >
            Agregar
          </Button>
        </Box>
      </Card>
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
          {product.name} agregado al carrito
        </Alert>
      </Snackbar>
    </>
  );
};

export default function Home() {
  const { getFeaturedProducts } = useProductStore();
  
  const features = [
    { icon: <InventoryIcon sx={{ fontSize: 48 }} />, title: 'Control de Inventario', description: 'Gestiona tu stock en tiempo real', color: 'primary.main' },
    { icon: <StorefrontIcon sx={{ fontSize: 48 }} />, title: 'Tienda Virtual', description: 'Tu negocio disponible 24/7', color: 'secondary.main' },
    { icon: <SpeedIcon sx={{ fontSize: 48 }} />, title: 'Punto de Venta', description: 'Ventas rápidas y sencillas', color: 'success.main' },
    { icon: <DeliveryDiningIcon sx={{ fontSize: 48 }} />, title: 'Entregas', description: 'Gestión de pedidos a domicilio', color: 'info.main' }
  ];

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
        <Carousel images={carouselImages} />
        
        {/* Características */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  height: '100%',
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: feature.color,
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box sx={{ color: feature.color, mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" gutterBottom fontWeight="bold">{feature.title}</Typography>
                <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        {/* Productos destacados */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h4" component="h2" fontWeight="bold">Productos Destacados</Typography>
              <Typography variant="body1" color="text.secondary">Los favoritos de nuestros clientes</Typography>
            </Box>
            <Button component={Link} href="/products" variant="outlined" sx={{ borderRadius: 2 }}>
              Ver catálogo completo
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {getFeaturedProducts(4).map((product) => (
              <Grid key={product.id} size={{ xs: 6, sm: 6, md: 3 }}>
                <FeaturedProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Banner promocional */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 4, md: 6 }, 
            borderRadius: 4, 
            mb: 8,
            background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <LocalOfferIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              ¡Digitaliza tu Negocio Hoy!
            </Typography>
            <Typography variant="h6" paragraph sx={{ opacity: 0.95, maxWidth: 600, mx: 'auto' }}>
              Únete a los comerciantes que ya confían en Supplie.me para gestionar su tienda de manera inteligente
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              component={Link}
              href="/contact"
              sx={{ mt: 2, bgcolor: 'white', color: 'primary.main', fontWeight: 'bold', px: 5, py: 1.5, '&:hover': { bgcolor: 'grey.100' } }}
            >
              Solicitar Demo
            </Button>
          </Box>
          <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Box sx={{ position: 'absolute', bottom: -30, left: -30, width: 150, height: 150, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
        </Paper>
        
        {/* Categorías */}
        <Box>
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom mb={1}>
            Explora por categorías
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Encuentra lo que necesitas rápidamente
          </Typography>
          
          <Grid container spacing={2}>
            {['Lácteos', 'Frutas', 'Carnes', 'Abarrotes', 'Bebidas', 'Limpieza'].map((category) => (
              <Grid key={category} size={{ xs: 6, sm: 4, md: 2 }}>
                <Paper 
                  component={Link} 
                  href={`/products?category=${category}`}
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                    color: 'text.primary',
                    display: 'block',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.main',
                      color: 'white',
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <Typography variant="h6" component="h3" fontWeight="600">{category}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
