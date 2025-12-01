'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import { useProductStore } from '../store/productStore';
import ProductSlider from '@/components/ui/ProductSlider';
import VideoSection from '@/components/ui/VideoSection';

// Slides para el carousel hero - Todos naranja
const carouselSlides = [
  {
    id: 'welcome',
    title: '¡Bienvenido a Supplie.me!',
    subtitle: 'Empoderamos tu tienda con tecnología inteligente',
    cta: { text: 'Explorar Tienda', href: '/products' },
    showLogo: true
  },
  {
    id: 'inventory',
    title: 'Digitaliza tu Tienda',
    subtitle: 'Gestión inteligente de inventario y ventas para tu negocio',
    cta: { text: 'Solicitar Demo', href: '/contact' },
    icon: <StorefrontIcon sx={{ fontSize: { xs: 48, md: 80 } }} />,
    showLogo: false
  },
  {
    id: 'demo',
    title: 'Prueba el Sistema',
    subtitle: 'Explora cómo funcionaría tu tienda virtual con productos de ejemplo',
    cta: { text: 'Ver Productos Demo', href: '/products' },
    icon: <SpeedIcon sx={{ fontSize: { xs: 48, md: 80 } }} />,
    showLogo: false
  }
];

// Componente de Carousel Hero (principal) - Solo naranja
const HeroCarousel = ({ slides }: { slides: typeof carouselSlides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  return (
    <Box 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      sx={{
        position: 'relative',
        height: { xs: '320px', sm: '380px', md: '450px' },
        overflow: 'hidden',
        borderRadius: 4,
        mt: 3,
        mb: 6,
        background: 'linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FCD34D 100%)'
      }}
    >
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: index === currentIndex ? 'auto' : 'none'
          }}
        >
          <Container 
            maxWidth="md" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              flexDirection: { xs: 'column', md: 'row' }, 
              gap: 4, 
              px: { xs: 2, sm: 4 }
            }}
          >
            {/* Texto */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, color: 'white', zIndex: 2 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight="bold" 
                gutterBottom 
                sx={{ 
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                  lineHeight: 1.2,
                  mb: { xs: 1, md: 2 }
                }}
              >
                {slide.title}
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  opacity: 0.95, 
                  textShadow: '0 1px 5px rgba(0,0,0,0.2)',
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
                  mb: { xs: 2, md: 3 }
                }}
              >
                {slide.subtitle}
              </Typography>
              
              <Button 
                component={Link}
                href={slide.cta.href}
                variant="contained"
                size="large"
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  fontWeight: 'bold',
                  px: { xs: 3, md: 5 },
                  py: { xs: 1, md: 1.5 },
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  '&:hover': { 
                    bgcolor: 'grey.100',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 25px rgba(0,0,0,0.25)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {slide.cta.text}
              </Button>
            </Box>
            
            {/* Logo o Icono */}
            <Box sx={{ position: 'relative' }}>
              {slide.showLogo ? (
                <Box sx={{ 
                  bgcolor: 'white', 
                  p: { xs: 3, md: 4 }, 
                  borderRadius: 4, 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image
                    src="/supplie_me_logo_150x40.svg"
                    alt="Supplie.me"
                    width={200}
                    height={55}
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </Box>
              ) : slide.icon ? (
                <Box 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    p: { xs: 3, md: 4 }, 
                    borderRadius: 4,
                    color: 'white',
                    '& svg': {
                      filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))'
                    }
                  }}
                >
                  {slide.icon}
                </Box>
              ) : null}
            </Box>
          </Container>
        </Box>
      ))}
      
      {/* Indicador de pausa */}
      {isPaused && (
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 8, md: 16 },
            right: { xs: 8, md: 16 },
            bgcolor: 'rgba(0,0,0,0.5)',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontSize: '0.7rem'
          }}
        >
          Pausado
        </Box>
      )}
      
      {/* Indicadores de navegación */}
      <Box 
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 24 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: index === currentIndex ? 28 : 10,
              height: 10,
              bgcolor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'white'
              }
            }}
          />
        ))}
      </Box>
      
      {/* Decoración de fondo */}
      <Box sx={{ 
        position: 'absolute', 
        top: -80, 
        right: -80, 
        width: { xs: 150, md: 250 }, 
        height: { xs: 150, md: 250 }, 
        borderRadius: '50%', 
        bgcolor: 'rgba(255,255,255,0.1)',
        pointerEvents: 'none'
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: -50, 
        left: -50, 
        width: { xs: 100, md: 180 }, 
        height: { xs: 100, md: 180 }, 
        borderRadius: '50%', 
        bgcolor: 'rgba(255,255,255,0.08)',
        pointerEvents: 'none'
      }} />
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
        <HeroCarousel slides={carouselSlides} />

        {/* Video de Presentación */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, md: 5 }, 
            mb: 6, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
            color: 'white'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <PlayCircleOutlineIcon sx={{ color: 'primary.light' }} />
                <Typography variant="overline" sx={{ color: 'primary.light', fontWeight: 'bold' }}>
                  Conoce Supplie.me
                </Typography>
              </Stack>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                ¿Qué es Supplie.me?
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 3, lineHeight: 1.8 }}>
                Descubre en 30 segundos cómo Supplie.me puede transformar tu tienda de abarrotes. 
                Control de inventario, ventas en línea y mucho más.
              </Typography>
              <Button 
                component={Link}
                href="/contact"
                variant="contained"
                size="large"
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                Solicitar Demo Gratis
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              {/* Placeholder de YouTube - Reemplazar con video real */}
              <VideoSection 
                videoId="eoRO2UQUjG8"
                aspectRatio="16/9"
              />
              <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center', opacity: 0.7 }}>
                Video de presentación de Supplie.me
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        
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
