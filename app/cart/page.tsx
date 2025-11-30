'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Box, 
  Button, 
  IconButton, 
  Divider, 
  TextField,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Skeleton
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useCartStore } from '../../store/cartStore';

// Definición de tipo para un elemento del carrito
type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Calcular el total
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 300 ? 0 : 50;
  const total = subtotal + shipping;

  // Simular el proceso de pago
  const processCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulación de procesamiento de pago
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      clearCart();
    }, 2000);
  };

  if (checkoutComplete) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ bgcolor: 'success.light', p: 5, textAlign: 'center' }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'white', mb: 2 }} />
            <Typography variant="h4" component="h1" fontWeight="bold" color="white" gutterBottom>
              ¡Compra Completada!
            </Typography>
            <Typography variant="body1" color="white" paragraph>
              Gracias por tu compra. Hemos enviado un correo electrónico con los detalles de tu pedido.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Button 
                component={Link}
                href="/products"
                variant="contained"
                size="large"
                sx={{ 
                  borderRadius: 2,
                  px: 4,
                  bgcolor: 'white',
                  color: 'success.main',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                Seguir Comprando
              </Button>
              <Button 
                component={Link}
                href="/"
                variant="outlined"
                size="large"
                sx={{ 
                  borderRadius: 2,
                  px: 4,
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Ir al Inicio
              </Button>
            </Stack>
          </Box>
        </Card>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ShoppingBagIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Tu carrito está vacío
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Parece que aún no has agregado ningún producto a tu carrito.
            </Typography>
            <Button 
              component={Link} 
              href="/products" 
              variant="contained" 
              size="large" 
              sx={{ mt: 2, px: 4 }}
            >
              Explorar productos
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Tu carrito
      </Typography>
      
      <Grid container spacing={4}>
        {/* Lista de productos */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: 'grey.100' }}>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell align="center">Precio</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box 
                            sx={{ 
                              width: 64, 
                              height: 64, 
                              bgcolor: 'grey.100', 
                              borderRadius: 1, 
                              mr: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              style={{ objectFit: 'contain' }}
                            />
                          </Box>
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {item.name}
                            </Typography>
                            {item.variant && (
                              <Typography variant="body2" color="text.secondary">
                                Variante: {item.variant}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          ${item.price.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconButton 
                            size="small" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ mx: 1, minWidth: '20px', textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="error" 
                          size="small" 
                          onClick={() => removeItem(item.id)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button 
              component={Link} 
              href="/products" 
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Seguir comprando
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={() => clearCart()}
              sx={{ borderRadius: 2 }}
            >
              Vaciar carrito
            </Button>
          </Box>
        </Grid>
        
        {/* Resumen de compra */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 2 }}>
            <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" fontWeight="bold">
                Resumen de compra
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">
                  Productos ({totalItems})
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">
                  Envío
                </Typography>
                <Typography variant="body1" fontWeight="medium" color="success.main">
                  Gratis
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              
              <Button
                component={Link}
                href="/checkout"
                variant="contained"
                fullWidth
                size="large"
                sx={{ borderRadius: 2, py: 1.5 }}
              >
                Proceder al Checkout
              </Button>
              
              <Alert severity="info" sx={{ mt: 3 }}>
                Este es un carrito de demostración. No se realizarán cargos reales.
              </Alert>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
} 