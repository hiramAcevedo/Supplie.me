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
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuthStore, authenticateAdmin } from '../../../store/authStore';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isAdmin } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Comprobar si el usuario ya está autenticado como admin
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      router.push('/admin');
    }
  }, [isAuthenticated, isAdmin, router]);

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

    setTimeout(() => {
      // Solo autenticar administradores
      const user = authenticateAdmin(formData.email, formData.password);
      
      if (user) {
        login(user);
        router.push('/admin');
      } else {
        setError('Credenciales de administrador inválidas. Acceso denegado.');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #F97316 100%)',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={8} 
          sx={{ 
            p: { xs: 4, md: 5 }, 
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
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
                bgcolor: 'warning.light', 
                px: 2, 
                py: 0.5, 
                borderRadius: 2,
                mb: 2
              }}
            >
              <AdminPanelSettingsIcon sx={{ color: 'warning.dark', fontSize: 20 }} />
              <Typography variant="body2" fontWeight="600" color="warning.dark">
                Acceso Restringido
              </Typography>
            </Box>
            
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="text.primary">
              Panel de Administración
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Ingresa tus credenciales de administrador
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
              label="Email de Administrador"
              type="email"
              margin="normal"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'grey.50',
                  '&:hover': { bgcolor: 'grey.100' },
                  '&.Mui-focused': { bgcolor: 'white' }
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'grey.50',
                  '&:hover': { bgcolor: 'grey.100' },
                  '&.Mui-focused': { bgcolor: 'white' }
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
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar al Panel'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ p: 2.5, bgcolor: 'grey.100', borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Este acceso es exclusivo para administradores del sistema.
            </Typography>
            <Link href="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary.main" fontWeight="bold" sx={{ mt: 1, '&:hover': { textDecoration: 'underline' } }}>
                ← Volver al login de clientes
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
