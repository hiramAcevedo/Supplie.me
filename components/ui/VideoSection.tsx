'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper, Skeleton, Modal, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';

interface VideoSectionProps {
  videoId: string;
  title?: string;
  description?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
}

function extractYouTubeId(url: string): string {
  if (!url.includes('/') && !url.includes('.')) {
    return url;
  }
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : url;
}

export default function VideoSection({ 
  videoId, 
  title, 
  description,
  aspectRatio = '16/9'
}: VideoSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const cleanVideoId = extractYouTubeId(videoId);
  const thumbnailUrl = `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsLoaded(false);
  };

  // Parámetros de YouTube para modo limpio (sin branding)
  const youtubeParams = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
    showinfo: '0',
    controls: '1',
    fs: '1',
    cc_load_policy: '0',
    iv_load_policy: '3',
    disablekb: '0'
  }).toString();

  return (
    <Box sx={{ width: '100%' }}>
      {title && (
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      
      {/* Thumbnail clickeable */}
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: aspectRatio,
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: 'grey.900',
          cursor: 'pointer'
        }}
        onClick={handleOpenModal}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            '&:hover .play-button': {
              transform: 'translate(-50%, -50%) scale(1.1)',
              bgcolor: 'primary.main'
            },
            '&:hover .overlay': {
              bgcolor: 'rgba(0,0,0,0.3)'
            }
          }}
        >
          <Box
            component="img"
            src={thumbnailUrl}
            alt={title || 'Video thumbnail'}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://img.youtube.com/vi/${cleanVideoId}/hqdefault.jpg`;
            }}
          />
          
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.2)',
              transition: 'background-color 0.3s ease'
            }}
          />
          
          <Box
            className="play-button"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: 60, md: 80 },
              height: { xs: 60, md: 80 },
              borderRadius: '50%',
              bgcolor: 'rgba(249, 115, 22, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            <PlayArrowIcon sx={{ fontSize: { xs: 36, md: 48 }, color: 'white', ml: 0.5 }} />
          </Box>
          
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              bgcolor: 'rgba(0,0,0,0.8)',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.875rem',
              fontWeight: 'medium'
            }}
          >
            0:30
          </Box>
          
          {/* Texto "Click para ver" */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.75rem'
            }}
          >
            Click para reproducir
          </Box>
        </Box>
      </Paper>

      {/* Modal de video */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            bgcolor: 'black',
            borderRadius: 3,
            overflow: 'hidden',
            outline: 'none',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}
        >
          {/* Botón cerrar */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: -48,
              right: 0,
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)'
              },
              zIndex: 10
            }}
          >
            <CloseIcon sx={{ fontSize: 28 }} />
          </IconButton>

          {/* Contenedor del video */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9'
            }}
          >
            {!isLoaded && (
              <Skeleton 
                variant="rectangular" 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'grey.800'
                }} 
              />
            )}
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${cleanVideoId}?${youtubeParams}`}
              title={title || 'YouTube video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
              onLoad={() => setIsLoaded(true)}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export function VideoFeatureSection({
  videoId,
  title,
  description,
  features,
  reversed = false
}: {
  videoId: string;
  title: string;
  description: string;
  features?: string[];
  reversed?: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: reversed ? 'row-reverse' : 'row' },
        gap: 4,
        alignItems: 'center',
        py: 4
      }}
    >
      <Box sx={{ flex: 1 }}>
        <VideoSection videoId={videoId} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {description}
        </Typography>
        {features && (
          <Box component="ul" sx={{ pl: 2 }}>
            {features.map((feature, index) => (
              <Typography 
                component="li" 
                key={index} 
                variant="body1" 
                sx={{ mb: 1 }}
              >
                {feature}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

