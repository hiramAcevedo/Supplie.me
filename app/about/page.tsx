'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlagIcon from '@mui/icons-material/Flag';
import VerifiedIcon from '@mui/icons-material/Verified';

const companyHistory = [
  { year: '2024 Q1', title: 'Inicio del Proyecto', description: 'Nace Supplie.me como proyecto académico en CUCEI, Universidad de Guadalajara.', icon: <RocketLaunchIcon />, color: 'primary' as const },
  { year: '2024 Q2', title: 'Desarrollo del MVP', description: 'Implementación del sistema de inventario y punto de venta con tecnología moderna.', icon: <IntegrationInstructionsIcon />, color: 'secondary' as const },
  { year: '2024 Q3', title: 'Lanzamiento Beta', description: 'Primera versión funcional con gestión de productos, carrito y panel de administración.', icon: <StorefrontIcon />, color: 'success' as const },
  { year: '2024 Q4', title: 'Expansión', description: 'Despliegue en producción con dominio propio supplie.me y mejoras continuas.', icon: <TrendingUpIcon />, color: 'warning' as const },
  { year: '2025', title: 'Visión Futura', description: 'Escalamiento para servir a múltiples tiendas de abarrotes en México.', icon: <GroupsIcon />, color: 'info' as const }
];

const coreValues = [
  { icon: <InventoryIcon sx={{ fontSize: 40 }} />, title: 'Simplicidad', description: 'Interfaces intuitivas que cualquier comerciante puede usar sin capacitación técnica.' },
  { icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, title: 'Innovación', description: 'Tecnología de vanguardia adaptada a las necesidades reales del comercio local.' },
  { icon: <GroupsIcon sx={{ fontSize: 40 }} />, title: 'Comunidad', description: 'Comprometidos con el empoderamiento de los comerciantes mexicanos.' },
  { icon: <VerifiedIcon sx={{ fontSize: 40 }} />, title: 'Confiabilidad', description: 'Sistema robusto y seguro para la gestión de tu negocio.' }
];

export default function About() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" component="h1" gutterBottom fontWeight="bold"
            sx={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Quiénes Somos
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Transformando la forma en que las tiendas de abarrotes gestionan su negocio
          </Typography>
        </Box>
        
        {/* Sobre Nosotros */}
        <Grid container spacing={6} sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="secondary.main">
              Nuestra Historia
            </Typography>
            <Typography paragraph color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              <strong>Supplie.me</strong> nació como un proyecto académico en el Centro Universitario de Ciencias 
              Exactas e Ingenierías (CUCEI) de la Universidad de Guadalajara, con la visión de 
              empoderar a los dueños de tiendas de abarrotes y pequeños comercios.
            </Typography>
            <Typography paragraph color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Nuestro equipo de desarrollo identificó una necesidad clara: los comerciantes locales 
              necesitan herramientas tecnológicas accesibles y fáciles de usar para competir en el 
              mercado digital actual.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                p: 4, borderRadius: 4,
                background: 'linear-gradient(135deg, #F7FAFC 0%, #E2E8F0 100%)',
                minHeight: 300, border: '2px solid', borderColor: 'divider'
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Image
                  src="/supplie_me_logo_150x40.svg"
                  alt="Supplie.me Logo"
                  width={220}
                  height={60}
                  style={{ marginBottom: '16px' }}
                />
                <Typography variant="body1" color="text.secondary" fontWeight={500}>
                  Tu tienda inteligente
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Misión y Visión */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ height: '100%', borderRadius: 4, border: '2px solid', borderColor: 'primary.main', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'primary.main', color: 'white', mr: 2 }}>
                    <FlagIcon sx={{ fontSize: 32 }} />
                  </Box>
                  <Typography variant="h4" component="h2" fontWeight="bold" color="primary.main">Misión</Typography>
                </Box>
                <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
                  Proveer a los dueños de tiendas de abarrotes y pequeños comercios una plataforma 
                  tecnológica integral, accesible y fácil de usar, que les permita <strong>digitalizar 
                  su negocio</strong>, gestionar su inventario de manera eficiente y expandir su alcance 
                  a través del comercio electrónico.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ height: '100%', borderRadius: 4, border: '2px solid', borderColor: 'secondary.main', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'secondary.main', color: 'white', mr: 2 }}>
                    <VisibilityIcon sx={{ fontSize: 32 }} />
                  </Box>
                  <Typography variant="h4" component="h2" fontWeight="bold" color="secondary.main">Visión</Typography>
                </Box>
                <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
                  Ser la plataforma líder en México para la <strong>digitalización de tiendas de 
                  abarrotes y comercios locales</strong>, reconocidos por nuestra innovación, facilidad 
                  de uso y compromiso con el empoderamiento de los comerciantes tradicionales.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Valores */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" textAlign="center" sx={{ mb: 5 }}>
            Nuestros Valores
          </Typography>
          <Grid container spacing={3}>
            {coreValues.map((value, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 4, textAlign: 'center', border: '1px solid', borderColor: 'divider', transition: 'all 0.3s', '&:hover': { borderColor: 'primary.main', transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(249, 115, 22, 0.15)' } }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{value.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{value.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{value.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Timeline */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" fontWeight="bold" sx={{ mb: 4 }}>
            Nuestra Trayectoria
          </Typography>
          <Timeline position="alternate">
            {companyHistory.map((event, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                  <Typography variant="h6" component="span" color="primary.main" fontWeight="bold">{event.year}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector sx={{ bgcolor: 'primary.light' }} />
                  <TimelineDot color={event.color} sx={{ p: 1.5 }}>{event.icon}</TimelineDot>
                  <TimelineConnector sx={{ bgcolor: 'primary.light' }} />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h6" component="span" fontWeight="bold">{event.title}</Typography>
                    <Typography color="text.secondary">{event.description}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
        
        {/* Políticas de Calidad */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">Políticas de Calidad</Typography>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)' }}>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
              En Supplie.me nos comprometemos a mantener los más altos estándares de calidad:
            </Typography>
            <List>
              {[
                'Desarrollo de software siguiendo las mejores prácticas y estándares de la industria.',
                'Protección de datos mediante protocolos de seguridad robustos y encriptación.',
                'Disponibilidad del servicio 24/7 con monitoreo continuo y respaldo de información.',
                'Mejora continua basada en la retroalimentación de nuestros usuarios.',
                'Soporte técnico profesional y oportuno para resolver cualquier incidencia.',
                'Actualizaciones regulares con nuevas funcionalidades y mejoras de rendimiento.'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemIcon><CheckCircleOutlineIcon color="success" /></ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ color: 'text.secondary' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
        
        {/* Ubicación */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">Ubicación</Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, height: '100%', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" gutterBottom color="primary.main" fontWeight="bold">Sede de Desarrollo</Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  <strong>Centro Universitario de Ciencias Exactas e Ingenierías (CUCEI)</strong><br />
                  Universidad de Guadalajara
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  Blvd. Marcelino García Barragán #1421<br />
                  Col. Olímpica<br />
                  Guadalajara, Jalisco, México<br />
                  CP 44430
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  <strong>Email:</strong> contacto@supplie.me<br />
                  <strong>Web:</strong> https://supplie.me
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Paper elevation={0} sx={{ p: 0, borderRadius: 4, overflow: 'hidden', height: '100%' }}>
                <Box sx={{ width: '100%', height: '100%', minHeight: '350px' }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.3615169683976!2d-103.32802462406637!3d20.654866100514205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b23a9bbba80d%3A0xdacdb7fd592feb90!2sCentro%20Universitario%20de%20Ciencias%20Exactas%20e%20Ingenier%C3%ADas%20(CUCEI)!5e0!3m2!1ses-419!2smx!4v1747631817015!5m2!1ses-419!2smx" 
                    width="100%" height="100%" style={{ border: 0, minHeight: '350px' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        
        {/* CTA */}
        <Box sx={{ textAlign: 'center', p: 6, borderRadius: 4, background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', color: 'white' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>¿Listo para digitalizar tu negocio?</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>Únete a Supplie.me y lleva tu tienda al siguiente nivel</Typography>
          <Button component={Link} href="/contact" variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.main', px: 6, py: 1.5, fontWeight: 'bold', '&:hover': { bgcolor: 'grey.100' } }}>
            Contáctanos
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
