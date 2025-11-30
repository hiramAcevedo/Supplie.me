'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Container,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Typography
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import CartDrawer from '../ui/CartDrawer';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  
  const { totalItems } = useCartStore();
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();

  useEffect(() => {
    const { userId, setUserId } = useCartStore.getState();
    
    if (isAuthenticated && user && userId !== user.id) {
      setUserId(user.id);
    } else if (!isAuthenticated && userId !== null) {
      setUserId(null);
    }
  }, [isAuthenticated, user]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };
  
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCartDrawerOpen(true);
  };

  const navLinks = [
    { title: 'Inicio', path: '/' },
    { title: 'Productos', path: '/products' },
    { title: 'Nosotros', path: '/about' },
    { title: 'FAQ', path: '/faq' },
    { title: 'Contacto', path: '/contact' },
  ];

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{
          bgcolor: '#FFFFFF',
          color: 'text.primary',
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: { xs: 0.5, md: 1 } }}>
            {/* Logo SVG */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexGrow: 1
              }}
            >
              <Link 
                href="/" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  textDecoration: 'none' 
                }}
              >
                <Image 
                  src="/supplie_me_logo_150x40.svg"
                  alt="Supplie.me"
                  width={130}
                  height={35}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Link>
            </Box>

            {/* Enlaces de navegación */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  style={{ textDecoration: 'none' }}
                >
                  <Button 
                    sx={{ 
                      mx: 0.5,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: 'text.secondary',
                      borderRadius: 2,
                      px: 2,
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                      }
                    }}
                  >
                    {link.title}
                  </Button>
                </Link>
              ))}
              
              <IconButton 
                aria-label="carrito de compras"
                sx={{ 
                  ml: 1,
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
                onClick={handleCartClick}
              >
                <Badge badgeContent={totalItems} color="primary" max={99}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {isAuthenticated ? (
                <>
                  <IconButton 
                    aria-label="perfil de usuario"
                    onClick={handleMenuClick}
                    sx={{ ml: 1 }}
                  >
                    <Avatar 
                      src={user?.avatar || undefined} 
                      alt={user?.name || 'Usuario'} 
                      sx={{ 
                        width: 36, 
                        height: 36,
                        border: '2px solid',
                        borderColor: 'primary.main'
                      }} 
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: { borderRadius: 2, minWidth: 200, mt: 1 }
                    }}
                  >
                    <MenuItem sx={{ pointerEvents: 'none' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {user?.name}
                      </Typography>
                    </MenuItem>
                    <MenuItem sx={{ pointerEvents: 'none', color: 'primary.main' }}>
                      <Typography variant="body2">
                        {isAdmin ? '👑 Administrador' : '👤 Cliente'}
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <MenuItem onClick={handleMenuClose}>
                        Mi Perfil
                      </MenuItem>
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <MenuItem onClick={handleMenuClose}>
                          Panel de Admin
                        </MenuItem>
                      </Link>
                    )}
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                      Cerrar Sesión
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<PersonIcon />}
                    sx={{ ml: 2, px: 3 }}
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </Box>

            {/* Menú móvil */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <IconButton 
                aria-label="carrito de compras"
                sx={{ mr: 1, color: 'text.secondary' }}
                onClick={handleCartClick}
              >
                <Badge badgeContent={totalItems} color="primary" max={99}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              
              <IconButton 
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ color: 'text.secondary' }}
              >
                <span style={{fontSize: 28, fontWeight: 'bold'}}>≡</span>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer móvil */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: '320px',
            borderRadius: '16px 0 0 16px'
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Image 
              src="/supplie_me_logo_150x40.svg"
              alt="Supplie.me"
              width={110}
              height={30}
              style={{ objectFit: 'contain' }}
            />
            <IconButton onClick={toggleDrawer}>
              <span style={{fontSize: 24, fontWeight: 'bold'}}>×</span>
            </IconButton>
          </Box>
        </Box>
        
        {isAuthenticated && (
          <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Avatar 
              src={user?.avatar || undefined} 
              alt={user?.name || 'Usuario'} 
              sx={{ width: 44, height: 44, mr: 2 }} 
            />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {user?.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {isAdmin ? '👑 Administrador' : '👤 Cliente'}
              </Typography>
            </Box>
          </Box>
        )}
        
        <List sx={{ px: 1 }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={toggleDrawer}
            >
              <ListItem 
                sx={{
                  cursor: 'pointer',
                  borderRadius: 2,
                  mb: 0.5,
                  '&:hover': { bgcolor: 'primary.light', color: 'white' }
                }}
              >
                <ListItemText 
                  primary={link.title} 
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            </Link>
          ))}
          
          {isAuthenticated ? (
            <>
              <Divider sx={{ my: 2 }} />
              <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }} onClick={toggleDrawer}>
                <ListItem sx={{ cursor: 'pointer', borderRadius: 2, '&:hover': { bgcolor: 'grey.100' } }}>
                  <ListItemText primary="Mi Perfil" />
                </ListItem>
              </Link>
              
              {isAdmin && (
                <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }} onClick={toggleDrawer}>
                  <ListItem sx={{ cursor: 'pointer', borderRadius: 2, '&:hover': { bgcolor: 'grey.100' } }}>
                    <ListItemText primary="Panel de Admin" />
                  </ListItem>
                </Link>
              )}
              
              <ListItem 
                onClick={() => { logout(); toggleDrawer(); }}
                sx={{ cursor: 'pointer', color: 'error.main', borderRadius: 2, '&:hover': { bgcolor: 'error.light', color: 'white' } }}
              >
                <ListItemText primary="Cerrar Sesión" />
              </ListItem>
            </>
          ) : (
            <Box sx={{ p: 2 }}>
              <Link href="/login" style={{ textDecoration: 'none' }} onClick={toggleDrawer}>
                <Button variant="contained" fullWidth size="large" startIcon={<PersonIcon />}>
                  Iniciar Sesión
                </Button>
              </Link>
            </Box>
          )}
        </List>
      </Drawer>
      
      <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      <Toolbar />
    </>
  );
}
