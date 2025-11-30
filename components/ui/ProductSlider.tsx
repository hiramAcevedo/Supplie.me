'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Button,
  Stack,
  Snackbar,
  Alert,
  Rating
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartStore, CartItem } from '@/store/cartStore';
import { Product } from '@/store/productStore';

interface ProductSliderProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ProductSlider({
  products,
  title = 'Productos Destacados',
  subtitle = 'Desliza para explorar más productos',
  autoPlay = true,
  autoPlayInterval = 4000
}: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [addedProduct, setAddedProduct] = useState<string>('');
  const sliderRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();

  // Número de items visibles según el tamaño de pantalla
  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  // Auto-play con pausa al hover
  useEffect(() => {
    if (!autoPlay || isPaused || products.length <= itemsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, maxIndex, autoPlayInterval, products.length, itemsPerView]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const discountedPrice = product.discountPercent
      ? product.price * (1 - product.discountPercent / 100)
      : product.price;

    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: discountedPrice,
      quantity: 1,
      image: product.image,
    };

    addItem(cartItem);
    setAddedProduct(product.name);
    setOpenSnackbar(true);
  };

  // Touch/drag support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
    setIsPaused(false);
  };

  return (
    <Box sx={{ mb: 8 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h2" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={handlePrev}
            sx={{
              bgcolor: 'grey.100',
              '&:hover': { bgcolor: 'primary.main', color: 'white' }
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              bgcolor: 'grey.100',
              '&:hover': { bgcolor: 'primary.main', color: 'white' }
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      {/* Slider Container */}
      <Box
        ref={sliderRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          py: 1
        }}
      >
        {/* Slides */}
        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                minWidth: { xs: '50%', sm: '50%', md: `${100 / itemsPerView}%` },
                px: 1.5,
                boxSizing: 'border-box'
              }}
            >
              <ProductSliderCard product={product} onAddToCart={handleAddToCart} />
            </Box>
          ))}
        </Box>

        {/* Pause Indicator */}
        {isPaused && autoPlay && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              bgcolor: 'rgba(0,0,0,0.6)',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: '0.75rem',
              zIndex: 10
            }}
          >
            ⏸ Pausado
          </Box>
        )}
      </Box>

      {/* Indicadores de posición */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: currentIndex === index ? 24 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: currentIndex === index ? 'primary.main' : 'grey.300',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
          {addedProduct} agregado al carrito
        </Alert>
      </Snackbar>
    </Box>
  );
}

// Componente de tarjeta individual
function ProductSliderCard({
  product,
  onAddToCart
}: {
  product: Product;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}) {
  const discountedPrice = product.discountPercent
    ? product.price * (1 - product.discountPercent / 100)
    : product.price;

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
        }
      }}
    >
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
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                fontWeight: 'bold'
              }}
            />
          )}
        </Box>

        <CardContent sx={{ pb: 1 }}>
          <Typography variant="h6" component="h3" gutterBottom noWrap fontWeight="600">
            {product.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
            <Rating value={product.rating} precision={0.5} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">
              ({product.rating})
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              ${discountedPrice.toFixed(2)}
            </Typography>

            {(product.discountPercent ?? 0) > 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
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
          onClick={(e) => onAddToCart(product, e)}
        >
          Agregar
        </Button>
      </Box>
    </Card>
  );
}

