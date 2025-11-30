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
  TextField,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Stack,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Chip,
  IconButton,
  InputAdornment
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SecurityIcon from '@mui/icons-material/Security';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { 
  SuccessAnimation, 
  FadeInUp, 
  LoadingSpinner,
  AnimatedCheckmark,
  ConfettiEffect 
} from '@/components/ui/AnimatedComponents';

const steps = ['Envío', 'Pago', 'Confirmación'];

// Direcciones de ejemplo
const savedAddresses = [
  {
    id: '1',
    name: 'Casa',
    street: 'Av. Revolución 1234',
    colony: 'Col. Centro',
    city: 'Guadalajara, Jalisco',
    zip: '44100',
    phone: '33 1234 5678',
    isDefault: true
  },
  {
    id: '2',
    name: 'Trabajo',
    street: 'Blvd. Puerta de Hierro 5678',
    colony: 'Col. Puerta de Hierro',
    city: 'Zapopan, Jalisco',
    zip: '45116',
    phone: '33 8765 4321',
    isDefault: false
  }
];

// Tarjetas guardadas de ejemplo
const savedCards = [
  {
    id: '1',
    type: 'visa',
    last4: '4242',
    expiry: '12/26',
    holder: 'USUARIO DEMO',
    isDefault: true
  },
  {
    id: '2',
    type: 'mastercard',
    last4: '5555',
    expiry: '08/25',
    holder: 'USUARIO DEMO',
    isDefault: false
  }
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]?.id || '');
  const [selectedCard, setSelectedCard] = useState(savedCards[0]?.id || '');
  const [useNewCard, setUseNewCard] = useState(false);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Formulario de nueva tarjeta
  const [cardForm, setCardForm] = useState({
    number: '',
    expiry: '',
    cvv: '',
    holder: ''
  });

  // Formulario de nueva dirección
  const [addressForm, setAddressForm] = useState({
    name: '',
    street: '',
    colony: '',
    city: '',
    zip: '',
    phone: ''
  });

  // Costos
  const subtotal = totalPrice;
  const shipping = subtotal > 500 ? 0 : 49;
  const total = subtotal + shipping;

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      processOrder();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const processOrder = () => {
    setIsProcessing(true);
    // Simular procesamiento
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setOrderId(`ORD-${Date.now().toString().slice(-8)}`);
      clearCart();
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  // Si el carrito está vacío
  if (items.length === 0 && !orderComplete) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Tu carrito está vacío</Typography>
        <Button component={Link} href="/products" variant="contained" sx={{ mt: 2 }}>
          Ver productos
        </Button>
      </Container>
    );
  }

  // Orden completada
  if (orderComplete) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <ConfettiEffect />
        <Paper elevation={0} sx={{ p: 6, borderRadius: 4, textAlign: 'center' }}>
          <AnimatedCheckmark size={120} />
          <FadeInUp delay={0.3}>
            <Typography variant="h3" fontWeight="bold" sx={{ mt: 4, color: 'success.main' }}>
              ¡Pedido Confirmado!
            </Typography>
          </FadeInUp>
          <FadeInUp delay={0.5}>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              Número de orden: <strong>{orderId}</strong>
            </Typography>
          </FadeInUp>
          <FadeInUp delay={0.7}>
            <Alert severity="success" sx={{ mt: 4, mx: 'auto', maxWidth: 500 }}>
              Hemos enviado un correo de confirmación a {user?.email || 'tu email'}
            </Alert>
          </FadeInUp>
          <FadeInUp delay={0.9}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Button 
                component={Link} 
                href="/products" 
                variant="contained" 
                size="large"
                sx={{ borderRadius: 2 }}
              >
                Seguir Comprando
              </Button>
              <Button 
                component={Link} 
                href="/profile" 
                variant="outlined" 
                size="large"
                sx={{ borderRadius: 2 }}
              >
                Ver Mis Pedidos
              </Button>
            </Stack>
          </FadeInUp>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <IconButton component={Link} href="/cart">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">
          Checkout
        </Typography>
      </Stack>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel 
              StepIconProps={{
                sx: {
                  '&.Mui-completed': { color: 'success.main' },
                  '&.Mui-active': { color: 'primary.main' }
                }
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        {/* Contenido principal */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Paso 1: Envío */}
          {activeStep === 0 && (
            <FadeInUp>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <LocalShippingIcon color="primary" sx={{ fontSize: 32 }} />
                  <Typography variant="h5" fontWeight="bold">
                    Dirección de Envío
                  </Typography>
                </Stack>

                {!useNewAddress && savedAddresses.length > 0 && (
                  <>
                    <FormControl component="fieldset" sx={{ width: '100%' }}>
                      <RadioGroup
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                      >
                        {savedAddresses.map((address) => (
                          <Paper
                            key={address.id}
                            elevation={0}
                            sx={{
                              p: 2,
                              mb: 2,
                              borderRadius: 2,
                              border: '2px solid',
                              borderColor: selectedAddress === address.id ? 'primary.main' : 'divider',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onClick={() => setSelectedAddress(address.id)}
                          >
                            <FormControlLabel
                              value={address.id}
                              control={<Radio />}
                              label={
                                <Box sx={{ ml: 1 }}>
                                  <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                      {address.name}
                                    </Typography>
                                    {address.isDefault && (
                                      <Chip label="Predeterminada" size="small" color="primary" />
                                    )}
                                  </Stack>
                                  <Typography variant="body2" color="text.secondary">
                                    {address.street}, {address.colony}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {address.city}, C.P. {address.zip}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Tel: {address.phone}
                                  </Typography>
                                </Box>
                              }
                              sx={{ m: 0, width: '100%' }}
                            />
                          </Paper>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <Button 
                      startIcon={<AddIcon />} 
                      onClick={() => setUseNewAddress(true)}
                      sx={{ mt: 2 }}
                    >
                      Agregar nueva dirección
                    </Button>
                  </>
                )}

                {(useNewAddress || savedAddresses.length === 0) && (
                  <Box>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Nombre de la dirección"
                          placeholder="Ej: Casa, Trabajo"
                          value={addressForm.name}
                          onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Teléfono"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Calle y número"
                          value={addressForm.street}
                          onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Colonia"
                          value={addressForm.colony}
                          onChange={(e) => setAddressForm({ ...addressForm, colony: e.target.value })}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Ciudad"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Código Postal"
                          value={addressForm.zip}
                          onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                        />
                      </Grid>
                    </Grid>
                    {savedAddresses.length > 0 && (
                      <Button onClick={() => setUseNewAddress(false)} sx={{ mt: 2 }}>
                        Usar dirección guardada
                      </Button>
                    )}
                  </Box>
                )}
              </Paper>
            </FadeInUp>
          )}

          {/* Paso 2: Pago */}
          {activeStep === 1 && (
            <FadeInUp>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <CreditCardIcon color="primary" sx={{ fontSize: 32 }} />
                  <Typography variant="h5" fontWeight="bold">
                    Método de Pago
                  </Typography>
                </Stack>

                {!useNewCard && savedCards.length > 0 && (
                  <>
                    <FormControl component="fieldset" sx={{ width: '100%' }}>
                      <RadioGroup
                        value={selectedCard}
                        onChange={(e) => setSelectedCard(e.target.value)}
                      >
                        {savedCards.map((card) => (
                          <Paper
                            key={card.id}
                            elevation={0}
                            sx={{
                              p: 2,
                              mb: 2,
                              borderRadius: 2,
                              border: '2px solid',
                              borderColor: selectedCard === card.id ? 'primary.main' : 'divider',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onClick={() => setSelectedCard(card.id)}
                          >
                            <FormControlLabel
                              value={card.id}
                              control={<Radio />}
                              label={
                                <Stack direction="row" alignItems="center" spacing={2} sx={{ ml: 1 }}>
                                  <Box sx={{ 
                                    width: 50, 
                                    height: 32, 
                                    bgcolor: card.type === 'visa' ? '#1A1F71' : '#EB001B',
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold'
                                  }}>
                                    {card.type.toUpperCase()}
                                  </Box>
                                  <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                      •••• •••• •••• {card.last4}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Expira: {card.expiry} • {card.holder}
                                    </Typography>
                                  </Box>
                                  {card.isDefault && (
                                    <Chip label="Predeterminada" size="small" color="primary" />
                                  )}
                                </Stack>
                              }
                              sx={{ m: 0, width: '100%' }}
                            />
                          </Paper>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <Button 
                      startIcon={<AddIcon />} 
                      onClick={() => setUseNewCard(true)}
                      sx={{ mt: 2 }}
                    >
                      Agregar nueva tarjeta
                    </Button>
                  </>
                )}

                {(useNewCard || savedCards.length === 0) && (
                  <Box>
                    <Alert severity="info" icon={<SecurityIcon />} sx={{ mb: 3 }}>
                      Tu información está protegida con encriptación de 256 bits
                    </Alert>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Número de tarjeta"
                          placeholder="1234 5678 9012 3456"
                          value={cardForm.number}
                          onChange={(e) => setCardForm({ ...cardForm, number: formatCardNumber(e.target.value) })}
                          inputProps={{ maxLength: 19 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CreditCardIcon color="action" />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <TextField
                          fullWidth
                          label="Fecha de expiración"
                          placeholder="MM/AA"
                          value={cardForm.expiry}
                          onChange={(e) => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })}
                          inputProps={{ maxLength: 5 }}
                        />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <TextField
                          fullWidth
                          label="CVV"
                          placeholder="123"
                          type="password"
                          value={cardForm.cvv}
                          onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                          inputProps={{ maxLength: 4 }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <LockIcon color="action" fontSize="small" />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Nombre en la tarjeta"
                          placeholder="NOMBRE APELLIDO"
                          value={cardForm.holder}
                          onChange={(e) => setCardForm({ ...cardForm, holder: e.target.value.toUpperCase() })}
                        />
                      </Grid>
                    </Grid>
                    {savedCards.length > 0 && (
                      <Button onClick={() => setUseNewCard(false)} sx={{ mt: 2 }}>
                        Usar tarjeta guardada
                      </Button>
                    )}
                  </Box>
                )}
              </Paper>
            </FadeInUp>
          )}

          {/* Paso 3: Confirmación */}
          {activeStep === 2 && (
            <FadeInUp>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <CheckCircleIcon color="primary" sx={{ fontSize: 32 }} />
                  <Typography variant="h5" fontWeight="bold">
                    Confirmar Pedido
                  </Typography>
                </Stack>

                {/* Resumen de envío */}
                <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    DIRECCIÓN DE ENVÍO
                  </Typography>
                  {selectedAddress && savedAddresses.find(a => a.id === selectedAddress) && (
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {savedAddresses.find(a => a.id === selectedAddress)?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {savedAddresses.find(a => a.id === selectedAddress)?.street}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {savedAddresses.find(a => a.id === selectedAddress)?.city}
                      </Typography>
                    </Box>
                  )}
                </Paper>

                {/* Resumen de pago */}
                <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    MÉTODO DE PAGO
                  </Typography>
                  {selectedCard && savedCards.find(c => c.id === selectedCard) && (
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <CreditCardIcon color="action" />
                      <Typography variant="body1">
                        •••• {savedCards.find(c => c.id === selectedCard)?.last4}
                      </Typography>
                    </Stack>
                  )}
                </Paper>

                {/* Productos */}
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  PRODUCTOS ({items.length})
                </Typography>
                {items.map((item) => (
                  <Stack 
                    key={item.id} 
                    direction="row" 
                    alignItems="center" 
                    spacing={2} 
                    sx={{ py: 1 }}
                  >
                    <Box sx={{ width: 50, height: 50, bgcolor: 'grey.100', borderRadius: 1 }}>
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={50} 
                        height={50} 
                        style={{ objectFit: 'contain' }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight="medium">{item.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Cantidad: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight="bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Stack>
                ))}
              </Paper>
            </FadeInUp>
          )}
        </Grid>

        {/* Resumen del pedido */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3, position: 'sticky', top: 100 }}>
            <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" fontWeight="bold">
                Resumen del Pedido
              </Typography>
            </Box>
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography fontWeight="medium">${subtotal.toFixed(2)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Envío</Typography>
                  <Typography fontWeight="medium" color={shipping === 0 ? 'success.main' : 'inherit'}>
                    {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                  </Typography>
                </Stack>
                {shipping > 0 && (
                  <Alert severity="info" sx={{ py: 0.5 }}>
                    ¡Envío gratis en compras mayores a $500!
                  </Alert>
                )}
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" fontWeight="bold">Total</Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary.main">
                    ${total.toFixed(2)}
                  </Typography>
                </Stack>
              </Stack>

              <Box sx={{ mt: 3 }}>
                <Stack direction="row" spacing={1}>
                  {activeStep > 0 && (
                    <Button 
                      variant="outlined" 
                      onClick={handleBack}
                      sx={{ borderRadius: 2, flex: 1 }}
                    >
                      Atrás
                    </Button>
                  )}
                  <Button 
                    variant="contained" 
                    onClick={handleNext}
                    disabled={isProcessing}
                    sx={{ borderRadius: 2, flex: 2, py: 1.5 }}
                  >
                    {isProcessing ? (
                      <LoadingSpinner size={24} color="#fff" />
                    ) : activeStep === steps.length - 1 ? (
                      `Pagar $${total.toFixed(2)}`
                    ) : (
                      'Continuar'
                    )}
                  </Button>
                </Stack>
              </Box>

              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 3 }}>
                <LockIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  Pago seguro con encriptación SSL
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

