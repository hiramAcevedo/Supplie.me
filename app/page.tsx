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
  Stack
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import InventoryIcon from '@mui/icons-material/Inventory';
import SpeedIcon from '@mui/icons-material/Speed';
import { useProductStore } from '../store/productStore';
import ProductSlider from '@/components/ui/ProductSlider';

// Imágenes para el carousel hero
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

// Componente de Carousel Hero (principal)
const HeroCarousel = ({ images }: { images: typeof carouselImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  return (
    <Box 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
      
      {/* Indicador de pausa */}
      {isPaused && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'rgba(0,0,0,0.5)',
            color: 'white',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            fontSize: '0.75rem'
          }}
        >
          ⏸ Pausado
        </Box>
      )}
      
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

export default function Home() {
  const { products, getFeaturedProducts } = useProductStore();
  
  const features = [
    { icon: <InventoryIcon sx={{ fontSize: 48 }} />, title: 'Control de Inventario', description: 'Gestiona tu stock en tiempo real', color: 'primary.main' },
    { icon: <StorefrontIcon sx={{ fontSize: 48 }} />, title: 'Tienda Virtual', description: 'Tu negocio disponible 24/7', color: 'secondary.main' },
    { icon: <SpeedIcon sx={{ fontSize: 48 }} />, title: 'Punto de Venta', description: 'Ventas rápidas y sencillas', color: 'success.main' },
    { icon: <DeliveryDiningIcon sx={{ fontSize: 48 }} />, title: 'Entregas', description: 'Gestión de pedidos a domicilio', color: 'info.main' }
  ];

  // Obtener productos por categoría para diferentes sliders
  const featuredProducts = getFeaturedProducts(8);
  const allProducts = products.slice(0, 12);

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
        {/* Hero Carousel */}
        <HeroCarousel images={carouselImages} />
        
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
        
        {/* Slider de Productos Destacados */}
        <ProductSlider 
          products={featuredProducts}
          title="🔥 Ofertas Especiales"
          subtitle="Desliza para ver más ofertas • Se pausa al pasar el mouse"
          autoPlay={true}
          autoPlayInterval={4000}
        />
        
        {/* Slider de Todos los Productos */}
        <ProductSlider 
          products={allProducts}
          title="📦 Explora Nuestros Productos"
          subtitle="Encuentra todo lo que necesitas para tu tienda"
          autoPlay={true}
          autoPlayInterval={5000}
        />
        
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
