'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper, Skeleton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const cleanVideoId = extractYouTubeId(videoId);
  const thumbnailUrl = `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

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
      
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: aspectRatio,
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: 'grey.900'
        }}
      >
        {!isPlaying ? (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              '&:hover .play-button': {
                transform: 'translate(-50%, -50%) scale(1.1)',
                bgcolor: 'primary.main'
              },
              '&:hover .overlay': {
                bgcolor: 'rgba(0,0,0,0.3)'
              }
            }}
            onClick={handlePlay}
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
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(249, 115, 22, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 48, color: 'white', ml: 0.5 }} />
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
          </Box>
        ) : (
          <>
            {!isLoaded && (
              <Skeleton 
                variant="rectangular" 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }} 
              />
            )}
            <iframe
              src={`https://www.youtube.com/embed/${cleanVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title || 'YouTube video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
          </>
        )}
      </Paper>
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

