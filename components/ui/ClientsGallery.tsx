'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Rating,
  Modal,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VerifiedIcon from '@mui/icons-material/Verified';

interface ClientTestimonial {
  id: string;
  name: string;
  businessName: string;
  location: string;
  image: string;
  avatar: string;
  testimonial: string;
  rating: number;
  joinedDate: string;
}

// Datos de ejemplo (ilustrativos)
const clientsData: ClientTestimonial[] = [
  {
    id: '1',
    name: 'María González',
    businessName: 'Abarrotes La Esperanza',
    location: 'Guadalajara, Jalisco',
    image: '/mujer1.png',
    avatar: '/dogactually.webp',
    testimonial: 'Supplie.me transformó mi negocio. Ahora tengo control total de mi inventario y mis clientes pueden hacer pedidos en línea.',
    rating: 5,
    joinedDate: 'Octubre 2025'
  },
  {
    id: '2',
    name: 'Roberto Hernández',
    businessName: 'Mini Super Don Beto',
    location: 'Zapopan, Jalisco',
    image: '/hombre2.png',
    avatar: '/dogactually.webp',
    testimonial: 'Antes perdía dinero por productos vencidos. Con las alertas de stock, eso ya no pasa. ¡Excelente herramienta!',
    rating: 5,
    joinedDate: 'Noviembre 2025'
  },
  {
    id: '3',
    name: 'Carmen Rodríguez',
    businessName: 'Tiendita de la Esquina',
    location: 'Tlaquepaque, Jalisco',
    image: '/mujer2.png',
    avatar: '/dogactually.webp',
    testimonial: 'Mis clientes ahora me hacen pedidos por WhatsApp gracias a mi tienda virtual. Mis ventas aumentaron un 40%.',
    rating: 4,
    joinedDate: 'Noviembre 2025'
  },
  {
    id: '4',
    name: 'José Luis Martínez',
    businessName: 'Abarrotes El Ahorro',
    location: 'Tonalá, Jalisco',
    image: '/hombre3.png',
    avatar: '/dogactually.webp',
    testimonial: 'La facilidad de uso es increíble. En minutos tenía mi tienda funcionando. Lo recomiendo a todos los comerciantes.',
    rating: 5,
    joinedDate: 'Octubre 2025'
  },
  {
    id: '5',
    name: 'Patricia Sánchez',
    businessName: 'Súper Patricia',
    location: 'El Salto, Jalisco',
    image: '/mujer3.png',
    avatar: '/dogactually.webp',
    testimonial: 'El soporte técnico es muy bueno. Siempre me ayudan cuando tengo dudas. Se nota que les importa el comerciante.',
    rating: 5,
    joinedDate: 'Noviembre 2025'
  },
  {
    id: '6',
    name: 'Fernando López',
    businessName: 'Miscelánea Los Pinos',
    location: 'Tlajomulco, Jalisco',
    image: '/hombre1.png',
    avatar: '/dogactually.webp',
    testimonial: 'Por fin puedo ver mis ventas y ganancias en tiempo real. Antes todo era en libreta y me confundía mucho.',
    rating: 4,
    joinedDate: 'Octubre 2025'
  }
];

export default function ClientsGallery() {
  const [selectedClient, setSelectedClient] = useState<ClientTestimonial | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (client: ClientTestimonial, index: number) => {
    setSelectedClient(client);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedClient(null);
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? clientsData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedClient(clientsData[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === clientsData.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedClient(clientsData[newIndex]);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Comerciantes que ya Confían en Nosotros
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
          Conoce a algunos de los negocios que ya están digitalizando su operación con Supplie.me
        </Typography>
        <Chip 
          label="* Imágenes con fines ilustrativos" 
          size="small" 
          variant="outlined"
          sx={{ fontSize: '0.75rem' }}
        />
      </Box>

      {/* Galería */}
      <Grid container spacing={2}>
        {clientsData.map((client, index) => (
          <Grid key={client.id} size={{ xs: 6, sm: 4, md: 4 }}>
            <Paper
              elevation={0}
              onClick={() => handleOpen(client, index)}
              sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '1/1',
                transition: 'all 0.3s ease',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  '& .overlay': {
                    opacity: 1
                  },
                  '& img': {
                    transform: 'scale(1.1)'
                  }
                }
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                <Image
                  src={client.image}
                  alt={client.businessName}
                  fill
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </Box>
              
              {/* Overlay con info */}
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: 'white',
                  opacity: { xs: 1, md: 0 },
                  transition: 'opacity 0.3s ease'
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold" noWrap>
                  {client.businessName}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  {client.location}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Modal de detalle */}
      <Modal
        open={!!selectedClient}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Paper
          sx={{
            position: 'relative',
            maxWidth: 700,
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            borderRadius: 3,
            outline: 'none'
          }}
        >
          {selectedClient && (
            <>
              {/* Botón cerrar */}
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 10,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  '&:hover': { bgcolor: 'white' }
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Navegación */}
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  '&:hover': { bgcolor: 'white' }
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  '&:hover': { bgcolor: 'white' }
                }}
              >
                <ArrowForwardIcon />
              </IconButton>

              {/* Imagen */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 300,
                  bgcolor: 'grey.100'
                }}
              >
                <Image
                  src={selectedClient.image}
                  alt={selectedClient.businessName}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>

              {/* Contenido */}
              <Box sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar
                    src={selectedClient.avatar}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="h6" fontWeight="bold">
                        {selectedClient.name}
                      </Typography>
                      <VerifiedIcon color="primary" fontSize="small" />
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <StorefrontIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {selectedClient.businessName}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                <Chip 
                  label={selectedClient.location} 
                  size="small" 
                  sx={{ mb: 2 }}
                />

                <Rating value={selectedClient.rating} readOnly sx={{ mb: 2 }} />

                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontStyle: 'italic',
                    color: 'text.secondary',
                    mb: 2,
                    lineHeight: 1.8
                  }}
                >
                  "{selectedClient.testimonial}"
                </Typography>

                <Typography variant="caption" color="text.disabled">
                  Cliente desde {selectedClient.joinedDate}
                </Typography>

                <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="caption" color="text.disabled">
                    * Esta es una representación ilustrativa con fines demostrativos. Las imágenes y testimonios son ejemplos de cómo se mostrarían clientes reales.
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Paper>
      </Modal>
    </Box>
  );
}

