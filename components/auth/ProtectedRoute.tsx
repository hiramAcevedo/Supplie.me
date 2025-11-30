'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';

type ProtectedRouteProps = {
  children: React.ReactNode;
  adminOnly?: boolean;
};

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isAdmin } = useAuthStore();
  
  useEffect(() => {
    // Si no está autenticado
    if (!isAuthenticated) {
      // Si es una ruta de admin, redirigir al login de admin
      if (adminOnly || pathname.startsWith('/admin')) {
        router.push('/admin/login');
      } else {
        // Guardar la ruta actual para redirigir después del login
        sessionStorage.setItem('redirectAfterLogin', pathname);
        router.push('/login');
      }
      return;
    }
    
    // Si la ruta es solo para admin y el usuario no es admin
    if (adminOnly && !isAdmin) {
      router.push('/');
      return;
    }
  }, [isAuthenticated, isAdmin, adminOnly, router, pathname]);
  
  // Si está autenticado y tiene los permisos correctos, mostrar el contenido
  if (isAuthenticated && (!adminOnly || isAdmin)) {
    return <>{children}</>;
  }
  
  // Durante la redirección, no mostrar nada
  return null;
}
