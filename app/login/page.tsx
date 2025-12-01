'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useAuthStore, authenticateUser, isAdminEmail } from '../../store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isAdmin } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated) {
      redirectUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  
  const redirectUser = () => {
    const savedRoute = sessionStorage.getItem('redirectAfterLogin');
    
    if (savedRoute) {
      sessionStorage.removeItem('redirectAfterLogin');
      router.push(savedRoute);
    } else {
      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (isAdminEmail(formData.email)) {
      setError('Este es un correo de administrador. Por favor, ingresa desde el panel de administración.');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const user = authenticateUser(formData.email, formData.password);
      
      if (user) {
        login(user);
      } else {
        setError('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const demoAccounts = [
    { type: 'Usuario Demo', email: 'usuario@supplie.me', password: 'usuario123' },
    { type: 'Cliente', email: 'cliente@supplie.me', password: 'cliente123' }
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setFormData({ email, password });
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        background: 'linear-gradient(135deg, #F7FAFC 0%, #E2E8F0 50%, #FB923C 100%)'
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={8} 
          sx={{ 
            p: { xs: 4, md: 5 }, 
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            background: 'rgba(255,255,255,0.98)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/supplie_me_logo_150x40.svg"
                alt="Supplie.me"
                width={160}
                height={44}
                priority
              />
            </Box>
            
            <Box 
              sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 1, 
                bgcolor: 'grey.100', 
                px: 2, 
                py: 0.5, 
                borderRadius: 2,
                mb: 2
              }}
            >
              <StorefrontIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2" fontWeight="600" color="text.secondary">
                Portal de Clientes
              </Typography>
            </Box>
            
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="text.primary">
              Bienvenido
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Ingresa a tu cuenta para comprar
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              margin="normal"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white',
                  '&:hover': { bgcolor: 'grey.50' },
                  '&.Mui-focused': { bgcolor: 'white' }
                },
                '& .MuiInputLabel-root': {
                  bgcolor: 'white',
                  px: 0.5,
                  '&.Mui-focused': {
                    color: 'primary.main'
                  }
                },
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 100px white inset !important',
                  WebkitTextFillColor: '#333 !important',
                  borderRadius: '8px'
                },
                '& input:-webkit-autofill:hover': {
                  WebkitBoxShadow: '0 0 0 100px #FAFAFA inset !important'
                },
                '& input:-webkit-autofill:focus': {
                  WebkitBoxShadow: '0 0 0 100px white inset !important'
                }
              }}
            />
            
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              margin="normal"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white',
                  '&:hover': { bgcolor: 'grey.50' },
                  '&.Mui-focused': { bgcolor: 'white' }
                },
                '& .MuiInputLabel-root': {
                  bgcolor: 'white',
                  px: 0.5,
                  '&.Mui-focused': {
                    color: 'primary.main'
                  }
                },
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 100px white inset !important',
                  WebkitTextFillColor: '#333 !important',
                  borderRadius: '8px'
                },
                '& input:-webkit-autofill:hover': {
                  WebkitBoxShadow: '0 0 0 100px #FAFAFA inset !important'
                },
                '& input:-webkit-autofill:focus': {
                  WebkitBoxShadow: '0 0 0 100px white inset !important'
                }
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ 
                mt: 4, 
                mb: 2, 
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Prueba la plataforma
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {demoAccounts.map((account, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => fillDemoCredentials(account.email, account.password)}
                color="secondary"
                startIcon={<PersonIcon />}
                fullWidth
                sx={{ borderRadius: 2, py: 1.2 }}
              >
                Ingresar como {account.type}
              </Button>
            ))}
          </Box>

          <Box sx={{ mt: 4, p: 2.5, bgcolor: 'primary.main', borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="white" fontWeight={500}>
              ¿Eres administrador de tienda?
            </Typography>
            <Link href="/admin/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="white" fontWeight="bold" sx={{ mt: 0.5, '&:hover': { textDecoration: 'underline' } }}>
                Accede al panel de administración →
              </Typography>
            </Link>
          </Box>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
            ¿Quieres digitalizar tu negocio?{' '}
            <Link href="/contact" style={{ color: '#F97316', fontWeight: 600 }}>
              Contáctanos
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
