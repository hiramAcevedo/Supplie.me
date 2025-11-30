import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'customer' | 'admin' | 'superadmin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
};

// Mock data para usuarios - Sistema actualizado para Supplie.me
// Usuarios administradores (acceden desde /admin/login)
const ADMIN_USERS = [
  {
    id: 'admin_1',
    email: 'admin@supplie.me',
    password: 'admin123',
    name: 'Administrador General',
    role: 'superadmin' as const,
    avatar: '/supplie-me_logo.png'
  },
  {
    id: 'admin_2',
    email: 'admin2@supplie.me',
    password: 'admin',
    name: 'Asesor Administrador',
    role: 'admin' as const,
    avatar: '/supplie-me_logo.png'
  }
];

// Usuarios regulares (clientes, acceden desde /login)
const CUSTOMER_USERS = [
  {
    id: 'usr_1',
    email: 'usuario@supplie.me',
    password: 'usuario123',
    name: 'Usuario Demo',
    role: 'customer' as const,
    avatar: '/dogactually.webp'
  },
  {
    id: 'usr_2',
    email: 'cliente@supplie.me',
    password: 'cliente123',
    name: 'Cliente Ejemplo',
    role: 'customer' as const,
    avatar: '/dogactually.webp'
  }
];

// Todos los usuarios combinados
const ALL_USERS = [...ADMIN_USERS, ...CUSTOMER_USERS];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      isSuperAdmin: false,

      login: (user) => {
        set({
          user,
          isAuthenticated: true,
          isAdmin: user.role === 'admin' || user.role === 'superadmin',
          isSuperAdmin: user.role === 'superadmin'
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          isSuperAdmin: false
        });
      }
    }),
    {
      name: 'supplie-me-auth', // nombre para localStorage actualizado
    }
  )
);

// Función para autenticar usuarios regulares (solo clientes)
export const authenticateUser = (email: string, password: string): User | null => {
  const user = CUSTOMER_USERS.find(u => u.email === email && u.password === password);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
  return null;
};

// Función para autenticar administradores (acceso restringido desde /admin/login)
export const authenticateAdmin = (email: string, password: string): User | null => {
  const user = ADMIN_USERS.find(u => u.email === email && u.password === password);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
  return null;
};

// Función para verificar si un email pertenece a un administrador
export const isAdminEmail = (email: string): boolean => {
  return ADMIN_USERS.some(u => u.email === email);
};
