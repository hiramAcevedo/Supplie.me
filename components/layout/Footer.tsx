'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Grid, Typography, IconButton, Stack, Divider } from '@mui/material';

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'secondary.dark', color: 'white', py: 8, flexShrink: 0 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 2 }}>
              <Image 
                src="/supplie_me_logo_150x40.svg"
                alt="Supplie.me"
                width={140}
                height={38}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Box>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, mb: 3, maxWidth: 300 }}>
              Empoderamos a dueños de tiendas de abarrotes a crear su tienda virtual con sistema de inventario y ventas inteligente.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton 
                color="inherit" size="small" component="a" href="https://facebook.com" target="_blank"
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'primary.main' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="inherit" size="small" component="a" href="https://twitter.com" target="_blank"
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'primary.main' } }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                color="inherit" size="small" component="a" href="https://instagram.com" target="_blank"
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'primary.main' } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                color="inherit" size="small" component="a" href="https://wa.me/5512345678" target="_blank"
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: '#25D366' } }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary.main">Enlaces</Typography>
            <Stack spacing={1.5}>
              {[
                { href: '/', label: 'Inicio' },
                { href: '/products', label: 'Productos' },
                { href: '/about', label: 'Nosotros' },
                { href: '/contact', label: 'Contacto' },
                { href: '/faq', label: 'Preguntas Frecuentes' }
              ].map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1, color: 'primary.main' } }}>
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary.main">Soporte</Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, mb: 1 }}>
              Lunes - Viernes: 9:00 AM - 6:00 PM
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, mb: 1 }}>
              Sábado: 10:00 AM - 2:00 PM
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
              Domingo: Cerrado
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary.main">Contacto</Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, mb: 1.5 }}>
              <strong>Ubicación:</strong><br />
              Blvd. Marcelino García Barragán #1421<br />
              Col. Olímpica, Guadalajara, Jal.<br />
              CP 44430, México
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8, mb: 1 }}>
              <strong>Teléfono:</strong> +52 (33) 1234-5678
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
              <strong>Email:</strong> contacto@supplie.me
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" align="center" color="inherit" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} Supplie.me — Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" color="inherit" sx={{ opacity: 0.7 }}>
            Desarrollado con 🧡 en Guadalajara, México
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
