'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Box, 
  Typography, 
  Rating, 
  Paper, 
  Grid, 
  Button, 
  ToggleButton, 
  ToggleButtonGroup, 
  TextField, 
  IconButton, 
  Divider,
  Container,
  Stack,
  Chip,
  Snackbar,
  Alert,
  Breadcrumbs
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useCartStore, CartItem } from '../../../store/cartStore';
import { useProductStore } from '../../../store/productStore';
import ImageGallery from '@/components/ui/ImageGallery';
import ProductReviews from '@/components/ui/ProductReviews';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const { getProductById } = useProductStore();
  const product = getProductById(resolvedParams.id) || {
    id: '',
    name: 'Producto no encontrado',
    description: 'Este producto no existe o ha sido eliminado',
    price: 0,
    image: '/dogactually.webp',
    category: '',
    rating: 0,
    stock: 0
  };
  
  const [selectedVariant, setSelectedVariant] = useState<string | null>('v1');
  const [quantity, setQuantity] = useState(1);
  const [anticipateDelivery, setAnticipateDelivery] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { addItem } = useCartStore();

  // Imágenes del producto (simulando múltiples vistas)
  const productImages = [
    product.image,
    product.image, // En producción serían diferentes imágenes
    product.image
  ];

  // Calcular precio con descuento
  const discountedPrice = product.discountPercent
    ? product.price * (1 - product.discountPercent / 100)
    : product.price;
  
  const handleVariantChange = (
    event: React.MouseEvent<HTMLElement>,
    newVariant: string | null,
  ) => {
    if (newVariant !== null) {
      setSelectedVariant(newVariant);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    const variants = [
      { id: 'v1', name: 'Normal' },
      { id: 'v2', name: 'Grande' },
      { id: 'v3', name: 'Familiar' }
    ];
    
    const selectedVariantData = variants.find(v => v.id === selectedVariant);
    
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: discountedPrice,
      quantity: quantity,
      image: product.image,
      variant: selectedVariantData?.name
    };
    
    addItem(cartItem);
    setOpenSnackbar(true);
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mb: 3 }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Inicio
        </Link>
        <Link href="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
          Productos
        </Link>
        <Link href={`/products?category=${product.category}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {product.category}
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      {/* Contenido Principal */}
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={4}>
          {/* Columna izquierda: Galería de imágenes */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ImageGallery images={productImages} productName={product.name} />
          </Grid>
          
          {/* Columna derecha: Información del producto */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              {/* Header con nombre y acciones */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip 
                      label={product.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    {product.stock > 0 && (
                      <Chip 
                        icon={<VerifiedIcon />}
                        label="Disponible" 
                        size="small" 
                        color="success"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                  <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                    {product.name}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <IconButton 
                    onClick={() => setIsFavorite(!isFavorite)}
                    color={isFavorite ? 'error' : 'default'}
                  >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <IconButton onClick={handleShare}>
                    <ShareIcon />
                  </IconButton>
                </Stack>
              </Stack>
              
              {/* Rating */}
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography variant="body1" fontWeight="bold">
                  {product.rating.toFixed(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  (3 opiniones)
                </Typography>
              </Stack>
              
              {/* Precio */}
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h3" component="p" fontWeight="bold" color="primary.main">
                    ${discountedPrice.toFixed(2)}
                  </Typography>
                  {(product.discountPercent ?? 0) > 0 && (
                    <>
                      <Typography 
                        variant="h5" 
                        color="text.secondary" 
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Chip 
                        icon={<LocalOfferIcon />}
                        label={`-${product.discountPercent}%`} 
                        color="error" 
                        size="medium"
                      />
                    </>
                  )}
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  IVA incluido • Precio por unidad
                </Typography>
              </Box>

              {/* Stock */}
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                <InventoryIcon color={product.stock > 10 ? 'success' : 'warning'} />
                <Typography 
                  variant="body1" 
                  color={product.stock > 10 ? 'success.main' : 'warning.main'}
                  fontWeight="medium"
                >
                  {product.stock > 10 
                    ? `${product.stock} unidades disponibles` 
                    : `¡Solo quedan ${product.stock} unidades!`}
                </Typography>
              </Stack>
              
              {/* Variantes */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                  Presentación:
                </Typography>
                <ToggleButtonGroup
                  value={selectedVariant}
                  exclusive
                  onChange={handleVariantChange}
                  aria-label="variantes de producto"
                >
                  {[
                    { id: 'v1', name: 'Normal' },
                    { id: 'v2', name: 'Grande' },
                    { id: 'v3', name: 'Familiar' }
                  ].map((variant) => (
                    <ToggleButton 
                      key={variant.id} 
                      value={variant.id}
                      sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        '&.Mui-selected': {
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                          }
                        }
                      }}
                    >
                      {variant.name}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
              
              {/* Cantidad */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                  Cantidad:
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2
                    }}
                  >
                    <IconButton onClick={decreaseQuantity} disabled={quantity <= 1}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ px: 3, minWidth: 50, textAlign: 'center' }}>
                      {quantity}
                    </Typography>
                    <IconButton onClick={increaseQuantity} disabled={quantity >= product.stock}>
                      <AddIcon />
                    </IconButton>
                  </Paper>
                  <Typography variant="body2" color="text.secondary">
                    Subtotal: <strong>${(discountedPrice * quantity).toFixed(2)}</strong>
                  </Typography>
                </Stack>
              </Box>
              
              {/* Anticipa tu compra */}
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Anticipa tu compra
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => setAnticipateDelivery(!anticipateDelivery)}
                    sx={{ 
                      border: 1, 
                      borderColor: 'grey.300',
                      bgcolor: anticipateDelivery ? 'primary.main' : 'transparent',
                      color: anticipateDelivery ? 'white' : 'inherit',
                      '&:hover': {
                        bgcolor: anticipateDelivery ? 'primary.dark' : 'grey.100',
                      }
                    }}
                  >
                    <CalendarTodayIcon />
                  </IconButton>
                </Stack>
                
                {anticipateDelivery && (
                  <TextField
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                    InputLabelProps={{ shrink: true }}
                    label="Fecha de entrega deseada"
                  />
                )}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              {/* Botones de acción */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  variant="contained" 
                  size="large"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  sx={{ 
                    py: 1.5, 
                    borderRadius: 2,
                    fontSize: '1.1rem'
                  }}
                >
                  Agregar al Carrito
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  fullWidth
                  startIcon={<DirectionsCarIcon />}
                  sx={{ 
                    py: 1.5, 
                    borderRadius: 2,
                    fontSize: '1.1rem'
                  }}
                >
                  Comprar Ahora
                </Button>
              </Stack>

              {/* Info de envío */}
              <Paper 
                elevation={0} 
                sx={{ 
                  mt: 3, 
                  p: 2, 
                  bgcolor: 'success.50', 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'success.200'
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocalShippingIcon color="success" />
                  <Typography variant="body2" color="success.dark">
                    <strong>Envío gratis</strong> en compras mayores a $500 • Entrega en 24-48 hrs
                  </Typography>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Sección de descripción y detalles */}
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Descripción del Producto
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {product.description}
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Especificaciones
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">Categoría</Typography>
              <Typography variant="body1" fontWeight="medium">{product.category}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">SKU</Typography>
              <Typography variant="body1" fontWeight="medium">PRD-{product.id.padStart(5, '0')}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">Disponibilidad</Typography>
              <Typography variant="body1" fontWeight="medium">{product.stock} unidades</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">Valoración</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Rating value={product.rating} size="small" readOnly />
                <Typography variant="body1" fontWeight="medium">{product.rating}/5</Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Sistema de Reseñas y Valoración */}
      <ProductReviews 
        productId={product.id}
        productName={product.name}
        initialRating={product.rating}
      />
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {quantity} x {product.name} agregado al carrito
        </Alert>
      </Snackbar>
    </Container>
  );
}
