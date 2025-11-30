'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Box, IconButton, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Si solo hay una imagen, duplicarla para mostrar el carrusel
  const galleryImages = images.length > 1 ? images : [images[0], images[0], images[0]];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Imagen Principal */}
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          bgcolor: 'grey.50',
          aspectRatio: '1/1',
          cursor: isZoomed ? 'zoom-out' : 'zoom-in'
        }}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
            transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
            p: 3
          }}
        >
          <Image
            src={galleryImages[selectedIndex]}
            alt={`${productName} - Imagen ${selectedIndex + 1}`}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>

        {/* Controles de navegación */}
        <IconButton
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          sx={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.9)',
            boxShadow: 2,
            '&:hover': { bgcolor: 'white' }
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <IconButton
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.9)',
            boxShadow: 2,
            '&:hover': { bgcolor: 'white' }
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>

        {/* Indicador de zoom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            bgcolor: 'rgba(0,0,0,0.6)',
            color: 'white',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontSize: '0.75rem'
          }}
        >
          <ZoomInIcon fontSize="small" />
          {isZoomed ? 'Click para alejar' : 'Click para zoom'}
        </Box>

        {/* Contador de imágenes */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: 'rgba(0,0,0,0.6)',
            color: 'white',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            fontSize: '0.875rem'
          }}
        >
          {selectedIndex + 1} / {galleryImages.length}
        </Box>
      </Paper>

      {/* Miniaturas */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'center',
          overflowX: 'auto',
          pb: 1
        }}
      >
        {galleryImages.map((image, index) => (
          <Paper
            key={index}
            elevation={0}
            onClick={() => handleThumbnailClick(index)}
            sx={{
              width: 72,
              height: 72,
              minWidth: 72,
              borderRadius: 2,
              overflow: 'hidden',
              cursor: 'pointer',
              border: '3px solid',
              borderColor: selectedIndex === index ? 'primary.main' : 'transparent',
              bgcolor: 'grey.100',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: selectedIndex === index ? 'primary.main' : 'grey.400'
              }
            }}
          >
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={image}
                alt={`${productName} - Miniatura ${index + 1}`}
                fill
                style={{ objectFit: 'contain', padding: '8px' }}
              />
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

