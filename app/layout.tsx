import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Chat from '@/components/ui/Chat'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta'
})

export const metadata: Metadata = {
  title: 'Supplie.me - Solución de inventario para tu tienda',
  description: 'Empoderamos a dueños de tiendas de abarrotes a crear su tienda virtual con sistema de inventario y ventas inteligente.',
  keywords: ['tienda virtual', 'inventario', 'abarrotes', 'punto de venta', 'sistema de ventas', 'minisuper'],
  authors: [{ name: 'Supplie.me Team' }],
  creator: 'Supplie.me',
  icons: {
    icon: '/supplie-me_favicon.svg',
    shortcut: '/supplie-me_favicon.svg',
    apple: '/supplie-me_logo.png',
  },
  openGraph: {
    title: 'Supplie.me - Solución de inventario para tu tienda',
    description: 'Empoderamos a dueños de tiendas de abarrotes a crear su tienda virtual',
    url: 'https://supplie.me',
    siteName: 'Supplie.me',
    locale: 'es_MX',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={plusJakarta.variable}>
      <head>
        <link rel="icon" href="/supplie-me_favicon.svg" type="image/svg+xml" />
      </head>
      <body className={plusJakarta.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <main style={{ flex: '1 0 auto' }}>
              {children}
            </main>
            <Footer />
            <Chat />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
