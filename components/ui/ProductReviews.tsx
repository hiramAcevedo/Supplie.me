'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  Paper,
  Avatar,
  Button,
  TextField,
  Divider,
  Stack,
  Chip,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

// Tipo para reviews
interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
  initialRating: number;
}

// Reviews de ejemplo (en producción vendrían de la BD)
const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'usr_1',
    userName: 'María García',
    userAvatar: '/dogactually.webp',
    rating: 5,
    comment: 'Excelente producto, muy fresco y de buena calidad. Lo recomiendo ampliamente para toda la familia.',
    date: '2025-11-28',
    helpful: 12,
    verified: true
  },
  {
    id: '2',
    userId: 'usr_2',
    userName: 'Carlos López',
    userAvatar: '/dogactually.webp',
    rating: 4,
    comment: 'Buen producto, llegó en buen estado. El precio es competitivo comparado con otras tiendas.',
    date: '2025-11-25',
    helpful: 8,
    verified: true
  },
  {
    id: '3',
    userId: 'usr_3',
    userName: 'Ana Martínez',
    userAvatar: '/dogactually.webp',
    rating: 5,
    comment: 'Me encantó! La calidad es superior a lo que esperaba. Definitivamente volveré a comprar.',
    date: '2025-11-20',
    helpful: 15,
    verified: false
  }
];

export default function ProductReviews({ productId, productName, initialRating }: ProductReviewsProps) {
  const { isAuthenticated, user } = useAuthStore();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [userComment, setUserComment] = useState('');
  const [likedReviews, setLikedReviews] = useState<string[]>([]);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [hoverRating, setHoverRating] = useState(-1);

  // Calcular estadísticas
  const totalReviews = reviews.length;
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : initialRating;

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: (reviews.filter(r => r.rating === star).length / totalReviews) * 100
  }));

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }
    setUserRating(newValue);
  };

  const handleCommentFocus = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
    }
  };

  const handleSubmitReview = () => {
    if (!isAuthenticated || !userRating || !userComment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      userId: user?.id || '',
      userName: user?.name || 'Usuario',
      userAvatar: user?.avatar || '/dogactually.webp',
      rating: userRating,
      comment: userComment.trim(),
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: true
    };

    setReviews([newReview, ...reviews]);
    setUserRating(null);
    setUserComment('');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleLikeReview = (reviewId: string) => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    if (likedReviews.includes(reviewId)) {
      setLikedReviews(likedReviews.filter(id => id !== reviewId));
      setReviews(reviews.map(r => 
        r.id === reviewId ? { ...r, helpful: r.helpful - 1 } : r
      ));
    } else {
      setLikedReviews([...likedReviews, reviewId]);
      setReviews(reviews.map(r => 
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
      ));
    }
  };

  const getRatingLabel = (value: number) => {
    switch (value) {
      case 1: return 'Muy malo';
      case 2: return 'Malo';
      case 3: return 'Regular';
      case 4: return 'Bueno';
      case 5: return 'Excelente';
      default: return '';
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Valoraciones y Opiniones
      </Typography>

      {/* Resumen de valoraciones */}
      <Box sx={{ display: 'flex', gap: 4, mb: 4, flexWrap: 'wrap' }}>
        {/* Puntuación general */}
        <Box sx={{ textAlign: 'center', minWidth: 150 }}>
          <Typography variant="h2" fontWeight="bold" color="primary.main">
            {averageRating.toFixed(1)}
          </Typography>
          <Rating value={averageRating} precision={0.1} readOnly size="large" />
          <Typography variant="body2" color="text.secondary">
            {totalReviews} opiniones
          </Typography>
        </Box>

        {/* Distribución de estrellas */}
        <Box sx={{ flex: 1, minWidth: 200 }}>
          {ratingDistribution.map(({ star, count, percentage }) => (
            <Stack key={star} direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
              <Typography variant="body2" sx={{ minWidth: 20 }}>{star}</Typography>
              <StarIcon fontSize="small" sx={{ color: 'warning.main' }} />
              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'warning.main',
                    borderRadius: 4
                  }
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 30 }}>
                {count}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Formulario para agregar valoración */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          ¿Qué te pareció {productName}?
        </Typography>

        {showSuccessMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Gracias por tu opinión! Tu reseña ha sido publicada.
          </Alert>
        )}

        {!isAuthenticated && (
          <Alert 
            severity="info" 
            sx={{ mb: 2 }}
            action={
              <Button 
                component={Link} 
                href="/login" 
                color="inherit" 
                size="small"
                startIcon={<LoginIcon />}
              >
                Iniciar Sesión
              </Button>
            }
          >
            Inicia sesión para dejar tu opinión
          </Alert>
        )}

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Tu calificación:
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Rating
              value={userRating}
              onChange={handleRatingChange}
              onChangeActive={(event, newHover) => setHoverRating(newHover)}
              size="large"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: 'warning.main'
                },
                '& .MuiRating-iconHover': {
                  color: 'warning.light'
                }
              }}
            />
            {(hoverRating !== -1 || userRating !== null) && (
              <Typography variant="body2" color="text.secondary">
                {getRatingLabel(hoverRating !== -1 ? hoverRating : userRating || 0)}
              </Typography>
            )}
          </Stack>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder={isAuthenticated ? "Comparte tu experiencia con este producto..." : "Inicia sesión para escribir una reseña"}
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          onFocus={handleCommentFocus}
          disabled={!isAuthenticated}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          onClick={handleSubmitReview}
          disabled={!isAuthenticated || !userRating || !userComment.trim()}
        >
          Publicar Opinión
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Lista de reseñas */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Opiniones de clientes ({totalReviews})
        </Typography>

        {reviews.map((review) => (
          <Paper
            key={review.id}
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              bgcolor: 'grey.50',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Stack direction="row" spacing={2}>
              <Avatar src={review.userAvatar} alt={review.userName}>
                {review.userName[0]}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {review.userName}
                  </Typography>
                  {review.verified && (
                    <Chip
                      icon={<VerifiedUserIcon />}
                      label="Compra verificada"
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{ height: 24, fontSize: '0.7rem' }}
                    />
                  )}
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Rating value={review.rating} size="small" readOnly />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.date).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                </Stack>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  {review.comment}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    ¿Te resultó útil?
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleLikeReview(review.id)}
                    color={likedReviews.includes(review.id) ? 'primary' : 'default'}
                  >
                    {likedReviews.includes(review.id) ? (
                      <ThumbUpIcon fontSize="small" />
                    ) : (
                      <ThumbUpOutlinedIcon fontSize="small" />
                    )}
                  </IconButton>
                  <Typography variant="caption" color="text.secondary">
                    {review.helpful}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Box>

      {/* Dialog de login */}
      <Dialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)}>
        <DialogTitle>Inicia sesión para continuar</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Para dejar una valoración o marcar una reseña como útil, necesitas iniciar sesión con tu cuenta.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLoginDialog(false)}>Cancelar</Button>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            startIcon={<LoginIcon />}
          >
            Iniciar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

