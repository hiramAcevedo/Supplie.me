'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Typography, 
  Container, 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  MenuItem,
  Divider,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Snackbar,
  IconButton,
  Stack,
  Chip
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';
import GroupsIcon from '@mui/icons-material/Groups';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VideoSection from '@/components/ui/VideoSection';
import ClientsGallery from '@/components/ui/ClientsGallery';

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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setOpenSnackbar(true);
      setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
    }, 1500);
  };

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{ 
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Sé de los Primeros
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 2 }}>
            Digitalízate y olvídate del estrés. Tu tienda lista para el futuro.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            ¿Tienes una tienda de abarrotes? Sé parte de los comerciantes pioneros que están transformando su negocio con tecnología.
          </Typography>
        </Box>

        {/* Video de Invitación */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, md: 4 }, 
            mb: 6, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
            border: '1px solid',
            borderColor: 'primary.200'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <PlayCircleOutlineIcon color="primary" />
                <Typography variant="overline" color="primary.main" fontWeight="bold">
                  Video de Invitación
                </Typography>
              </Stack>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                ¿Y si digitalizar tu tienda fuera más fácil de lo que crees?
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Descubre en 30 segundos cómo Supplie.me puede transformar tu negocio. 
                Lo que ves en nuestra página es exactamente cómo tus clientes verán TU tienda.
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Chip label="✓ Sin costo inicial" variant="outlined" />
                <Chip label="✓ Fácil de usar" variant="outlined" />
                <Chip label="✓ Soporte incluido" variant="outlined" />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              {/* Placeholder de YouTube - Reemplazar con video real */}
              <VideoSection 
                videoId="CUEX1dpcGFY"
                title=""
                aspectRatio="16/9"
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                Video de invitación de Supplie.me
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Galería de Clientes */}
        <Box sx={{ mb: 6 }}>
          <ClientsGallery />
        </Box>

        {/* Cards de opciones */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 4, textAlign: 'center', p: 2, border: '2px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, borderRadius: 3, display: 'inline-flex', mb: 2 }}>
                  <RocketLaunchIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Solicita tu Demo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Prueba Supplie.me sin compromiso. Te mostramos cómo puede transformar tu negocio en minutos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 4, textAlign: 'center', p: 2, border: '2px solid', borderColor: 'secondary.main' }}>
              <CardContent>
                <Box sx={{ bgcolor: 'secondary.main', color: 'white', p: 2, borderRadius: 3, display: 'inline-flex', mb: 2 }}>
                  <GroupsIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Únete como Beta Tester
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sé de los primeros en usar la plataforma. Acceso gratuito y tu opinión vale oro para nosotros.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 4, textAlign: 'center', p: 2, border: '2px solid', borderColor: 'success.main' }}>
              <CardContent>
                <Box sx={{ bgcolor: 'success.main', color: 'white', p: 2, borderRadius: 3, display: 'inline-flex', mb: 2 }}>
                  <CodeIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Colabora con Nosotros
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ¿Eres desarrollador o diseñador? Únete al equipo y ayúdanos a construir el futuro del comercio local.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Información de contacto */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ height: '100%', borderRadius: 4, overflow: 'hidden' }}>
              <Box sx={{ bgcolor: 'primary.main', p: 3, color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ bgcolor: 'white', p: 1, borderRadius: 2, display: 'flex' }}>
                    <Image
                      src="/supplie_me_logo_150x40.svg"
                      alt="Supplie.me"
                      width={100}
                      height={28}
                    />
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ mt: 2, opacity: 0.95 }}>
                  Estamos creando la plataforma que el comercio local necesita.
                </Typography>
              </Box>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'flex-start' }}>
                    <LocationOnIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">Ubicación</Typography>
                      <Typography variant="body2" color="text.secondary">
                        CUCEI - Universidad de Guadalajara<br />
                        Blvd. Marcelino García Barragán #1421<br />
                        Guadalajara, Jalisco, México
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <PhoneIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">Teléfono</Typography>
                      <Typography variant="body2" color="text.secondary">+52 (33) 1234-5678</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <EmailIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">Email</Typography>
                      <Typography variant="body2" color="text.secondary">contacto@supplie.me</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">Horario de Atención</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lunes a Viernes: 9:00 AM - 6:00 PM
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium">Síguenos</Typography>
                  <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
                    <IconButton sx={{ bgcolor: 'primary.light', color: 'white', '&:hover': { bgcolor: 'primary.main' } }} component="a" href="https://facebook.com" target="_blank">
                      <FacebookIcon />
                    </IconButton>
                    <IconButton sx={{ bgcolor: 'info.light', color: 'white', '&:hover': { bgcolor: 'info.main' } }} component="a" href="https://twitter.com" target="_blank">
                      <TwitterIcon />
                    </IconButton>
                    <IconButton sx={{ bgcolor: '#E4405F', color: 'white', '&:hover': { bgcolor: '#C13584' } }} component="a" href="https://instagram.com" target="_blank">
                      <InstagramIcon />
                    </IconButton>
                    <IconButton sx={{ bgcolor: '#25D366', color: 'white', '&:hover': { bgcolor: '#128C7E' } }} component="a" href="https://wa.me/523312345678" target="_blank">
                      <WhatsAppIcon />
                    </IconButton>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Formulario */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, height: '100%', border: '1px solid', borderColor: 'divider' }}>
              {isSubmitted ? (
                <Box sx={{ textAlign: 'center', py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Alert severity="success" variant="filled" sx={{ mb: 3, width: '100%' }}>
                    ¡Mensaje enviado con éxito!
                  </Alert>
                  <Typography variant="h6" paragraph>
                    Gracias por tu interés. Te contactaremos pronto para comenzar tu transformación digital.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => setIsSubmitted(false)} startIcon={<SendIcon />}>
                    Enviar otro mensaje
                  </Button>
                </Box>
              ) : (
                <>
                  <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                    ¡Da el primer paso!
                  </Typography>
                  <Typography variant="body1" paragraph color="text.secondary">
                    Cuéntanos sobre tu negocio y cómo quieres participar. Sin compromiso, sin presiones.
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth required id="name" name="name" label="Tu nombre"
                          value={formData.name} onChange={handleChange} variant="outlined"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'grey.50', '&:hover': { bgcolor: 'grey.100' }, '&.Mui-focused': { bgcolor: 'white' } } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth required id="email" name="email" label="Email" type="email"
                          value={formData.email} onChange={handleChange} variant="outlined"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'grey.50', '&:hover': { bgcolor: 'grey.100' }, '&.Mui-focused': { bgcolor: 'white' } } }}
                        />
                      </Grid>
                    </Grid>

                    <TextField
                      fullWidth id="phone" name="phone" label="Teléfono (opcional)"
                      value={formData.phone} onChange={handleChange} variant="outlined" sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'grey.50', '&:hover': { bgcolor: 'grey.100' }, '&.Mui-focused': { bgcolor: 'white' } } }}
                    />

                    <TextField
                      fullWidth required id="interest" name="interest" label="¿Qué te interesa?"
                      select value={formData.interest} onChange={handleChange} variant="outlined"
                      sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'grey.50', '&:hover': { bgcolor: 'grey.100' }, '&.Mui-focused': { bgcolor: 'white' } } }}
                    >
                      <MenuItem value="">Selecciona una opción</MenuItem>
                      <MenuItem value="demo">🚀 Quiero ver una demo</MenuItem>
                      <MenuItem value="beta">🧪 Quiero ser beta tester</MenuItem>
                      <MenuItem value="collab">💻 Quiero colaborar en el desarrollo</MenuItem>
                      <MenuItem value="info">📋 Solo quiero más información</MenuItem>
                      <MenuItem value="other">💬 Otro</MenuItem>
                    </TextField>

                    <TextField
                      fullWidth required id="message" name="message" label="Cuéntanos más"
                      multiline rows={4} value={formData.message} onChange={handleChange} variant="outlined"
                      placeholder="¿Tienes una tienda? ¿Qué problemas enfrentas? ¿Qué te gustaría lograr?"
                      sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'grey.50', '&:hover': { bgcolor: 'grey.100' }, '&.Mui-focused': { bgcolor: 'white' } } }}
                    />

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit" variant="contained" color="primary" size="large" disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                        sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                      >
                        {isLoading ? 'Enviando...' : 'Enviar mensaje'}
                      </Button>
                    </Box>
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Mapa de Ubicación */}
        <Paper 
          elevation={0} 
          sx={{ 
            mt: 6, 
            borderRadius: 4, 
            overflow: 'hidden', 
            border: '1px solid', 
            borderColor: 'divider' 
          }}
        >
          <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LocationOnIcon sx={{ fontSize: 32 }} />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Nuestra Ubicación
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  CUCEI - Universidad de Guadalajara, Guadalajara, Jalisco
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box 
            sx={{ 
              position: 'relative',
              width: '100%',
              height: { xs: 300, md: 400 },
              bgcolor: 'grey.100'
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.0989693968!2d-103.32580892427988!3d20.654859380945537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428af915e8f9c1f%3A0x5c0d1e7a9b81bb21!2sCentro%20Universitario%20de%20Ciencias%20Exactas%20e%20Ingenier%C3%ADas%20(CUCEI)!5e0!3m2!1ses-419!2smx!4v1701388800000!5m2!1ses-419!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Supplie.me - CUCEI, Universidad de Guadalajara"
            />
          </Box>
          <Box sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Dirección Completa
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Blvd. Marcelino García Barragán #1421, Olímpica, 44430 Guadalajara, Jal., México
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent={{ md: 'flex-end' }}>
                  <Button
                    variant="contained"
                    startIcon={<LocationOnIcon />}
                    component="a"
                    href="https://maps.google.com/?q=CUCEI+Universidad+de+Guadalajara"
                    target="_blank"
                    sx={{ borderRadius: 2 }}
                  >
                    Abrir en Google Maps
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PhoneIcon />}
                    component="a"
                    href="tel:+523312345678"
                    sx={{ borderRadius: 2 }}
                  >
                    Llamar Ahora
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button component={Link} href="/" variant="outlined" color="primary" size="large">
            Regresar al Inicio
          </Button>
        </Box>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} message="Mensaje enviado con éxito" />
    </Box>
  );
}
