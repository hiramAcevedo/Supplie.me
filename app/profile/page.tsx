'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  Avatar, 
  Tabs, 
  Tab, 
  Button, 
  TextField, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  InputAdornment
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuthStore } from '@/store/authStore';
import { FadeInUp, StaggeredList, AnimatedCard } from '@/components/ui/AnimatedComponents';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Datos de ejemplo
const initialAddresses = [
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

const initialCards = [
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

const sampleOrders = [
  {
    id: 'ORD-12345678',
    date: '2025-11-28',
    status: 'Entregado',
    total: 235.50,
    items: 4,
    statusColor: 'success'
  },
  {
    id: 'ORD-12345679',
    date: '2025-11-25',
    status: 'En camino',
    total: 156.00,
    items: 2,
    statusColor: 'info'
  },
  {
    id: 'ORD-12345680',
    date: '2025-11-20',
    status: 'Entregado',
    total: 420.75,
    items: 6,
    statusColor: 'success'
  }
];

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [tabValue, setTabValue] = useState(0);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [cards, setCards] = useState(initialCards);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  // Dialogs
  const [addressDialog, setAddressDialog] = useState({ open: false, editId: null as string | null });
  const [cardDialog, setCardDialog] = useState({ open: false, editId: null as string | null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, type: '', id: '' });
  
  // Forms
  const [addressForm, setAddressForm] = useState({
    name: '', street: '', colony: '', city: '', zip: '', phone: ''
  });
  const [cardForm, setCardForm] = useState({
    number: '', expiry: '', cvv: '', holder: ''
  });
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: ''
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Address handlers
  const handleOpenAddressDialog = (id?: string) => {
    if (id) {
      const address = addresses.find(a => a.id === id);
      if (address) {
        setAddressForm(address);
        setAddressDialog({ open: true, editId: id });
      }
    } else {
      setAddressForm({ name: '', street: '', colony: '', city: '', zip: '', phone: '' });
      setAddressDialog({ open: true, editId: null });
    }
  };

  const handleSaveAddress = () => {
    if (addressDialog.editId) {
      setAddresses(addresses.map(a => a.id === addressDialog.editId ? { ...addressForm, id: a.id, isDefault: a.isDefault } : a));
    } else {
      setAddresses([...addresses, { ...addressForm, id: Date.now().toString(), isDefault: addresses.length === 0 }]);
    }
    setAddressDialog({ open: false, editId: null });
    setSnackbar({ open: true, message: 'Dirección guardada correctamente', severity: 'success' });
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
    setSnackbar({ open: true, message: 'Dirección predeterminada actualizada', severity: 'success' });
  };

  // Card handlers
  const handleOpenCardDialog = () => {
    setCardForm({ number: '', expiry: '', cvv: '', holder: '' });
    setCardDialog({ open: true, editId: null });
  };

  const handleSaveCard = () => {
    const last4 = cardForm.number.replace(/\s/g, '').slice(-4);
    const type = cardForm.number.startsWith('4') ? 'visa' : 'mastercard';
    setCards([...cards, {
      id: Date.now().toString(),
      type,
      last4,
      expiry: cardForm.expiry,
      holder: cardForm.holder,
      isDefault: cards.length === 0
    }]);
    setCardDialog({ open: false, editId: null });
    setSnackbar({ open: true, message: 'Tarjeta agregada correctamente', severity: 'success' });
  };

  const handleSetDefaultCard = (id: string) => {
    setCards(cards.map(c => ({ ...c, isDefault: c.id === id })));
    setSnackbar({ open: true, message: 'Tarjeta predeterminada actualizada', severity: 'success' });
  };

  // Delete handlers
  const handleDelete = () => {
    if (deleteDialog.type === 'address') {
      setAddresses(addresses.filter(a => a.id !== deleteDialog.id));
    } else if (deleteDialog.type === 'card') {
      setCards(cards.filter(c => c.id !== deleteDialog.id));
    }
    setDeleteDialog({ open: false, type: '', id: '' });
    setSnackbar({ open: true, message: 'Eliminado correctamente', severity: 'success' });
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
    if (v.length >= 2) return v.slice(0, 2) + '/' + v.slice(2, 4);
    return v;
  };

  return (
    <ProtectedRoute>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <FadeInUp>
              <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Avatar 
                    src={user?.avatar || undefined} 
                    alt={user?.name || 'Usuario'} 
                    sx={{ width: 100, height: 100, mx: 'auto', mb: 2, border: '4px solid', borderColor: 'primary.light' }} 
                  />
                  <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                    {user?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {user?.email}
                  </Typography>
                  <Chip 
                    label={user?.role === 'admin' || user?.role === 'superadmin' ? 'Administrador' : 'Cliente'}
                    color={user?.role === 'admin' || user?.role === 'superadmin' ? 'error' : 'primary'}
                    size="small"
                  />
                </Box>
              </Card>

              <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <List component="nav" disablePadding>
                  {[
                    { icon: <AccountCircleIcon />, label: 'Mi Perfil', index: 0 },
                    { icon: <HomeIcon />, label: 'Direcciones', index: 1 },
                    { icon: <CreditCardIcon />, label: 'Métodos de Pago', index: 2 },
                    { icon: <ShoppingBasketIcon />, label: 'Mis Pedidos', index: 3 },
                    { icon: <FavoriteIcon />, label: 'Favoritos', index: 4 },
                  ].map((item) => (
                    <ListItem 
                      key={item.index}
                      onClick={() => setTabValue(item.index)}
                      sx={{ 
                        cursor: 'pointer',
                        bgcolor: tabValue === item.index ? 'primary.50' : 'transparent',
                        borderLeft: tabValue === item.index ? '4px solid' : '4px solid transparent',
                        borderColor: tabValue === item.index ? 'primary.main' : 'transparent',
                        transition: 'all 0.2s',
                        '&:hover': { bgcolor: 'grey.100' }
                      }}
                    >
                      <ListItemIcon sx={{ color: tabValue === item.index ? 'primary.main' : 'inherit' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: tabValue === item.index ? 'bold' : 'normal',
                          color: tabValue === item.index ? 'primary.main' : 'inherit'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </FadeInUp>
          </Grid>
          
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 9 }}>
            <FadeInUp delay={0.1}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, minHeight: 500 }}>
                {/* Tab 0: Perfil */}
                <TabPanel value={tabValue} index={0}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Datos Personales
                  </Typography>
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth label="Nombre completo"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth label="Email" type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth label="Teléfono"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth label="Nueva contraseña" type="password"
                        placeholder="Dejar vacío para no cambiar"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button variant="contained" sx={{ borderRadius: 2 }}>
                        Guardar Cambios
                      </Button>
                    </Grid>
                  </Grid>
                </TabPanel>

                {/* Tab 1: Direcciones */}
                <TabPanel value={tabValue} index={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold">
                      Mis Direcciones
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenAddressDialog()}
                      sx={{ borderRadius: 2 }}
                    >
                      Agregar Dirección
                    </Button>
                  </Stack>

                  <Grid container spacing={2}>
                    {addresses.map((address, index) => (
                      <Grid key={address.id} size={{ xs: 12, sm: 6 }}>
                        <AnimatedCard>
                          <Card 
                            sx={{ 
                              p: 2, 
                              borderRadius: 2,
                              border: '2px solid',
                              borderColor: address.isDefault ? 'primary.main' : 'divider',
                              height: '100%'
                            }}
                          >
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <HomeIcon color={address.isDefault ? 'primary' : 'action'} />
                                <Typography variant="subtitle1" fontWeight="bold">
                                  {address.name}
                                </Typography>
                                {address.isDefault && (
                                  <Chip label="Predeterminada" size="small" color="primary" />
                                )}
                              </Stack>
                              <Stack direction="row">
                                <IconButton size="small" onClick={() => handleOpenAddressDialog(address.id)}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton 
                                  size="small" 
                                  color="error"
                                  onClick={() => setDeleteDialog({ open: true, type: 'address', id: address.id })}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Stack>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {address.street}, {address.colony}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {address.city}, C.P. {address.zip}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Tel: {address.phone}
                            </Typography>
                            {!address.isDefault && (
                              <Button 
                                size="small" 
                                onClick={() => handleSetDefaultAddress(address.id)}
                                sx={{ mt: 1 }}
                              >
                                Establecer como predeterminada
                              </Button>
                            )}
                          </Card>
                        </AnimatedCard>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>

                {/* Tab 2: Métodos de Pago */}
                <TabPanel value={tabValue} index={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold">
                      Métodos de Pago
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<AddIcon />}
                      onClick={handleOpenCardDialog}
                      sx={{ borderRadius: 2 }}
                    >
                      Agregar Tarjeta
                    </Button>
                  </Stack>

                  <Alert severity="info" icon={<SecurityIcon />} sx={{ mb: 3 }}>
                    Tu información de pago está protegida con encriptación de nivel bancario.
                  </Alert>

                  <Grid container spacing={2}>
                    {cards.map((card) => (
                      <Grid key={card.id} size={{ xs: 12, sm: 6 }}>
                        <AnimatedCard>
                          <Card 
                            sx={{ 
                              p: 3, 
                              borderRadius: 2,
                              border: '2px solid',
                              borderColor: card.isDefault ? 'primary.main' : 'divider',
                              background: card.type === 'visa' 
                                ? 'linear-gradient(135deg, #1A1F71 0%, #2E3192 100%)'
                                : 'linear-gradient(135deg, #EB001B 0%, #F79E1B 100%)',
                              color: 'white'
                            }}
                          >
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                              <Typography variant="caption" sx={{ textTransform: 'uppercase', opacity: 0.8 }}>
                                {card.type}
                              </Typography>
                              <Stack direction="row">
                                <IconButton 
                                  size="small" 
                                  sx={{ color: 'white' }}
                                  onClick={() => setDeleteDialog({ open: true, type: 'card', id: card.id })}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Stack>
                            </Stack>
                            <Typography variant="h6" sx={{ mt: 2, letterSpacing: 2 }}>
                              •••• •••• •••• {card.last4}
                            </Typography>
                            <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
                              <Box>
                                <Typography variant="caption" sx={{ opacity: 0.7 }}>TITULAR</Typography>
                                <Typography variant="body2">{card.holder}</Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" sx={{ opacity: 0.7 }}>EXPIRA</Typography>
                                <Typography variant="body2">{card.expiry}</Typography>
                              </Box>
                            </Stack>
                            {card.isDefault && (
                              <Chip 
                                label="Predeterminada" 
                                size="small" 
                                sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                              />
                            )}
                            {!card.isDefault && (
                              <Button 
                                size="small" 
                                onClick={() => handleSetDefaultCard(card.id)}
                                sx={{ mt: 2, color: 'white' }}
                              >
                                Establecer como predeterminada
                              </Button>
                            )}
                          </Card>
                        </AnimatedCard>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>

                {/* Tab 3: Pedidos */}
                <TabPanel value={tabValue} index={3}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Mis Pedidos
                  </Typography>
                  <Stack spacing={2}>
                    {sampleOrders.map((order, index) => (
                      <AnimatedCard key={order.id}>
                        <Card sx={{ borderRadius: 2 }}>
                          <CardContent>
                            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }}>
                              <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                  {order.id}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {new Date(order.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </Typography>
                              </Box>
                              <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: { xs: 2, sm: 0 } }}>
                                <Chip 
                                  label={order.status}
                                  color={order.statusColor as any}
                                  size="small"
                                  icon={<LocalShippingIcon />}
                                />
                                <Typography variant="h6" color="primary.main" fontWeight="bold">
                                  ${order.total.toFixed(2)}
                                </Typography>
                                <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
                                  Ver detalles
                                </Button>
                              </Stack>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {order.items} productos
                            </Typography>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                    ))}
                  </Stack>
                </TabPanel>

                {/* Tab 4: Favoritos */}
                <TabPanel value={tabValue} index={4}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Mis Favoritos
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Aún no tienes productos favoritos. Explora nuestra tienda y agrega productos a tus favoritos.
                  </Typography>
                  <Button href="/products" variant="contained" sx={{ mt: 3, borderRadius: 2 }}>
                    Ver Productos
                  </Button>
                </TabPanel>
              </Paper>
            </FadeInUp>
          </Grid>
        </Grid>

        {/* Dialog: Nueva/Editar Dirección */}
        <Dialog open={addressDialog.open} onClose={() => setAddressDialog({ open: false, editId: null })} maxWidth="sm" fullWidth>
          <DialogTitle>{addressDialog.editId ? 'Editar Dirección' : 'Nueva Dirección'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Nombre" placeholder="Ej: Casa, Trabajo" value={addressForm.name} onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Teléfono" value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Calle y número" value={addressForm.street} onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Colonia" value={addressForm.colony} onChange={(e) => setAddressForm({ ...addressForm, colony: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Ciudad" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Código Postal" value={addressForm.zip} onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddressDialog({ open: false, editId: null })}>Cancelar</Button>
            <Button variant="contained" onClick={handleSaveAddress}>Guardar</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog: Nueva Tarjeta */}
        <Dialog open={cardDialog.open} onClose={() => setCardDialog({ open: false, editId: null })} maxWidth="sm" fullWidth>
          <DialogTitle>Agregar Tarjeta</DialogTitle>
          <DialogContent>
            <Alert severity="info" icon={<SecurityIcon />} sx={{ mb: 3, mt: 1 }}>
              Tu información está protegida con encriptación de 256 bits
            </Alert>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth label="Número de tarjeta" placeholder="1234 5678 9012 3456"
                  value={cardForm.number}
                  onChange={(e) => setCardForm({ ...cardForm, number: formatCardNumber(e.target.value) })}
                  inputProps={{ maxLength: 19 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><CreditCardIcon color="action" /></InputAdornment> }}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth label="Fecha de expiración" placeholder="MM/AA"
                  value={cardForm.expiry}
                  onChange={(e) => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })}
                  inputProps={{ maxLength: 5 }}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth label="CVV" placeholder="123" type="password"
                  value={cardForm.cvv}
                  onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                  inputProps={{ maxLength: 4 }}
                  InputProps={{ endAdornment: <InputAdornment position="end"><LockIcon color="action" fontSize="small" /></InputAdornment> }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth label="Nombre en la tarjeta" placeholder="NOMBRE APELLIDO"
                  value={cardForm.holder}
                  onChange={(e) => setCardForm({ ...cardForm, holder: e.target.value.toUpperCase() })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCardDialog({ open: false, editId: null })}>Cancelar</Button>
            <Button variant="contained" onClick={handleSaveCard}>Agregar Tarjeta</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog: Confirmar eliminación */}
        <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, type: '', id: '' })}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <Typography>¿Estás seguro de que deseas eliminar {deleteDialog.type === 'address' ? 'esta dirección' : 'esta tarjeta'}?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, type: '', id: '' })}>Cancelar</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>Eliminar</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ProtectedRoute>
  );
}
