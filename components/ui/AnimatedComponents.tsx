'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, keyframes, styled } from '@mui/material';

// ============================================
// KEYFRAMES ANIMATIONS
// ============================================

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInScale = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const confetti = keyframes`
  0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
`;

const checkmark = keyframes`
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
`;

const ripple = keyframes`
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
`;

// ============================================
// ANIMATED COMPONENTS
// ============================================

// Animated Success Checkmark
export function AnimatedCheckmark({ size = 120 }: { size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        mx: 'auto',
        animation: `${fadeInScale} 0.5s ease-out`
      }}
    >
      <svg viewBox="0 0 52 52" width={size} height={size}>
        <circle
          cx="26"
          cy="26"
          r="25"
          fill="none"
          stroke="#4CAF50"
          strokeWidth="2"
          style={{
            animation: `${fadeInScale} 0.5s ease-out`
          }}
        />
        <path
          fill="none"
          stroke="#4CAF50"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 27l7 7 16-16"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 0,
            animation: `${checkmark} 0.8s ease-out 0.3s both`
          }}
        />
      </svg>
    </Box>
  );
}

// Animated Cart Icon with Bounce
export function AnimatedCartBounce({ children }: { children: React.ReactNode }) {
  const [animate, setAnimate] = useState(false);

  const triggerAnimation = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 600);
  };

  return (
    <Box
      onClick={triggerAnimation}
      sx={{
        display: 'inline-flex',
        animation: animate ? `${bounce} 0.6s ease` : 'none',
        cursor: 'pointer'
      }}
    >
      {children}
    </Box>
  );
}

// Loading Spinner with Pulse
export function LoadingSpinner({ size = 40, color = '#F97316' }: { size?: number; color?: string }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        border: `3px solid ${color}20`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: `${spin} 1s linear infinite`,
        mx: 'auto'
      }}
    />
  );
}

// Skeleton Loader with Shimmer
export function SkeletonLoader({ 
  width = '100%', 
  height = 20, 
  borderRadius = 4 
}: { 
  width?: string | number; 
  height?: number;
  borderRadius?: number;
}) {
  return (
    <Box
      sx={{
        width,
        height,
        borderRadius: `${borderRadius}px`,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200px 100%',
        animation: `${shimmer} 1.5s infinite`
      }}
    />
  );
}

// Floating Animation Wrapper
export function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <Box
      sx={{
        animation: `${float} 3s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </Box>
  );
}

// Fade In Up Animation Wrapper
export function FadeInUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <Box
      sx={{
        animation: `${fadeInUp} 0.6s ease-out both`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </Box>
  );
}

// Slide In Right Animation
export function SlideInRight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <Box
      sx={{
        animation: `${slideInRight} 0.5s ease-out both`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </Box>
  );
}

// Pulse Animation (for notifications, badges)
export function PulseAnimation({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ animation: `${pulse} 2s ease-in-out infinite` }}>
      {children}
    </Box>
  );
}

// Shake Animation (for errors)
export function ShakeAnimation({ 
  children, 
  trigger 
}: { 
  children: React.ReactNode; 
  trigger: boolean;
}) {
  return (
    <Box sx={{ animation: trigger ? `${shake} 0.5s ease` : 'none' }}>
      {children}
    </Box>
  );
}

// Confetti Effect for Success
export function ConfettiEffect() {
  const colors = ['#F97316', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2
  }));

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 9999
      }}
    >
      {confettiPieces.map((piece) => (
        <Box
          key={piece.id}
          sx={{
            position: 'absolute',
            top: 0,
            left: piece.left,
            width: 10,
            height: 10,
            bgcolor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : 0,
            animation: `${confetti} ${piece.duration}s linear ${piece.delay}s`
          }}
        />
      ))}
    </Box>
  );
}

// Ripple Effect Button
export function RippleButton({ 
  children, 
  onClick,
  color = '#F97316'
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  color?: string;
}) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples([...ripples, { x, y, id }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
    
    onClick?.();
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'inline-block'
      }}
    >
      {children}
      {ripples.map((ripple) => (
        <Box
          key={ripple.id}
          sx={{
            position: 'absolute',
            top: ripple.y,
            left: ripple.x,
            width: 20,
            height: 20,
            borderRadius: '50%',
            bgcolor: `${color}40`,
            transform: 'translate(-50%, -50%)',
            animation: `${ripple} 0.6s ease-out`
          }}
        />
      ))}
    </Box>
  );
}

// Animated Counter
export function AnimatedCounter({ 
  value, 
  duration = 1000 
}: { 
  value: number; 
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startValue = displayValue;
    const endValue = value;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{displayValue}</span>;
}

// Staggered List Animation
export function StaggeredList({ 
  children, 
  staggerDelay = 0.1 
}: { 
  children: React.ReactNode[];
  staggerDelay?: number;
}) {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <Box
          sx={{
            animation: `${fadeInUp} 0.5s ease-out both`,
            animationDelay: `${index * staggerDelay}s`
          }}
        >
          {child}
        </Box>
      ))}
    </>
  );
}

// Success Animation Component (Full)
export function SuccessAnimation({ 
  title = '¡Éxito!',
  message = 'La operación se completó correctamente.'
}: {
  title?: string;
  message?: string;
}) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      {showConfetti && <ConfettiEffect />}
      <AnimatedCheckmark size={100} />
      <FadeInUp delay={0.3}>
        <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
          {title}
        </Typography>
      </FadeInUp>
      <FadeInUp delay={0.5}>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {message}
        </Typography>
      </FadeInUp>
    </Box>
  );
}

// Card with Hover Animation
export const AnimatedCard = styled(Box)(({ theme }) => ({
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
  }
}));

// Button with Scale Animation
export const ScaleButton = styled(Box)({
  transition: 'transform 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)'
  },
  '&:active': {
    transform: 'scale(0.95)'
  }
});

