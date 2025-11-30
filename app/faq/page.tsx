'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Typography, 
  Container, 
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Button,
  Chip,
  Tabs,
  Tab,
  Divider,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaymentIcon from '@mui/icons-material/Payment';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DevicesIcon from '@mui/icons-material/Devices';
import SecurityIcon from '@mui/icons-material/Security';

// Estructura para FAQs con categorías actualizadas para Supplie.me
const faqCategories = [
  {
    name: 'General',
    icon: <HelpOutlineIcon />,
    items: [
      {
        question: '¿Qué es Supplie.me?',
        answer: 'Supplie.me es una plataforma tecnológica diseñada para empoderar a dueños de tiendas de abarrotes y pequeños comercios. Ofrecemos un sistema integral que incluye gestión de inventario, punto de venta, tienda virtual y herramientas de análisis para hacer crecer tu negocio.',
        icon: <StorefrontIcon color="primary" />
      },
      {
        question: '¿Para quién está diseñado Supplie.me?',
        answer: 'Supplie.me está diseñado principalmente para tiendas de abarrotes, misceláneas, minimercados y pequeños comercios que quieran digitalizar su operación y tener un mejor control de su negocio. Es ideal para comerciantes que buscan crecer sin complicaciones tecnológicas.',
        icon: <HelpOutlineIcon color="primary" />
      },
      {
        question: '¿Cómo puedo empezar a usar Supplie.me?',
        answer: 'Es muy fácil. Puedes solicitar una demo gratuita desde nuestra página de contacto. Un miembro de nuestro equipo te contactará para mostrarte la plataforma y ayudarte a configurar tu tienda. También puedes registrarte como beta tester para probar las nuevas funcionalidades.',
        icon: <RocketLaunchIcon color="primary" />
      }
    ]
  },
  {
    name: 'Funcionalidades',
    icon: <InventoryIcon />,
    items: [
      {
        question: '¿Qué incluye el sistema de inventario?',
        answer: 'Nuestro sistema de inventario te permite registrar todos tus productos, controlar el stock en tiempo real, recibir alertas cuando los productos estén por agotarse, generar reportes de movimientos y mantener un historial completo de todas las transacciones.',
        icon: <InventoryIcon color="primary" />
      },
      {
        question: '¿Puedo vender en línea con Supplie.me?',
        answer: 'Sí, Supplie.me incluye una tienda virtual integrada donde tus clientes pueden ver tus productos, hacer pedidos y coordinar la entrega o recogida. Tu tienda estará disponible 24/7 sin necesidad de conocimientos técnicos de tu parte.',
        icon: <StorefrontIcon color="primary" />
      },
      {
        question: '¿Funciona en dispositivos móviles?',
        answer: 'Absolutamente. Supplie.me está diseñado con un enfoque "mobile-first", lo que significa que funciona perfectamente en smartphones, tablets y computadoras. Puedes gestionar tu negocio desde cualquier dispositivo con conexión a internet.',
        icon: <DevicesIcon color="primary" />
      }
    ]
  },
  {
    name: 'Precios y Pagos',
    icon: <PaymentIcon />,
    items: [
      {
        question: '¿Cuánto cuesta Supplie.me?',
        answer: 'Actualmente estamos en fase de lanzamiento y ofrecemos acceso gratuito a nuestros beta testers. Próximamente lanzaremos planes accesibles diseñados específicamente para pequeños comerciantes. Contáctanos para conocer más detalles y ser parte de los primeros usuarios.',
        icon: <PaymentIcon color="primary" />
      },
      {
        question: '¿Qué métodos de pago aceptan mis clientes?',
        answer: 'La tienda virtual de Supplie.me permite que tus clientes paguen en efectivo al recibir, transferencia bancaria, o pago en tienda. Próximamente integraremos pagos con tarjeta y otras pasarelas de pago digitales.',
        icon: <PaymentIcon color="primary" />
      },
      {
        question: '¿Hay costos ocultos o comisiones por venta?',
        answer: 'No. En Supplie.me creemos en la transparencia total. Los costos de la plataforma son fijos y no cobramos comisiones por cada venta que realices. Tu ganancia es tu ganancia.',
        icon: <PaymentIcon color="primary" />
      }
    ]
  },
  {
    name: 'Soporte y Seguridad',
    icon: <SupportAgentIcon />,
    items: [
      {
        question: '¿Mis datos están seguros?',
        answer: 'La seguridad es nuestra prioridad. Utilizamos encriptación de datos, respaldos automáticos diarios y servidores seguros para proteger toda la información de tu negocio. Cumplimos con las mejores prácticas de seguridad de la industria.',
        icon: <SecurityIcon color="primary" />
      },
      {
        question: '¿Qué tipo de soporte ofrecen?',
        answer: 'Ofrecemos soporte por email, WhatsApp y chat en vivo durante horario de oficina (Lunes a Viernes 9:00 AM - 6:00 PM). También contamos con una base de conocimientos con tutoriales y guías para ayudarte a sacar el máximo provecho de la plataforma.',
        icon: <SupportAgentIcon color="primary" />
      },
      {
        question: '¿Qué pasa si tengo un problema técnico?',
        answer: 'Nuestro equipo de soporte está disponible para ayudarte. Puedes reportar cualquier problema a través de contacto@supplie.me o mediante el chat integrado en la plataforma. Nos comprometemos a responder en menos de 24 horas.',
        icon: <SupportAgentIcon color="primary" />
      }
    ]
  }
];

export default function FAQ() {
  const [currentTab, setCurrentTab] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{ 
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Preguntas Frecuentes
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Todo lo que necesitas saber sobre Supplie.me y cómo puede ayudarte a digitalizar tu negocio.
          </Typography>
        </Box>

        {/* Categorías en pestañas */}
        <Box sx={{ mb: 4 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              mb: 4,
              '& .MuiTab-root': {
                borderRadius: 2,
                mr: 1,
                textTransform: 'none',
                fontWeight: 600,
                minHeight: 48
              },
              '& .Mui-selected': {
                bgcolor: 'primary.main',
                color: 'white !important'
              }
            }}
          >
            {faqCategories.map((category, index) => (
              <Tab 
                key={index} 
                label={category.name} 
                icon={category.icon} 
                iconPosition="start"
              />
            ))}
          </Tabs>

          {faqCategories.map((category, categoryIndex) => (
            <Box 
              key={categoryIndex} 
              role="tabpanel"
              hidden={currentTab !== categoryIndex}
              sx={{ transition: 'all 0.3s ease' }}
            >
              {currentTab === categoryIndex && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" component="h2" fontWeight="bold">
                      {category.name}
                    </Typography>
                    <Chip 
                      label={`${category.items.length} preguntas`} 
                      size="small" 
                      color="primary"
                      sx={{ ml: 2 }}
                    />
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  {category.items.map((item, itemIndex) => (
                    <Accordion 
                      key={itemIndex}
                      expanded={expanded === `${categoryIndex}-${itemIndex}`}
                      onChange={handleAccordionChange(`${categoryIndex}-${itemIndex}`)}
                      sx={{ 
                        mb: 2, 
                        borderRadius: '12px !important',
                        overflow: 'hidden',
                        boxShadow: 'none',
                        border: '1px solid',
                        borderColor: expanded === `${categoryIndex}-${itemIndex}` ? 'primary.main' : 'divider',
                        '&:before': { display: 'none' },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: expanded === `${categoryIndex}-${itemIndex}` ? 'white' : 'primary.main' }} />}
                        sx={{ 
                          bgcolor: expanded === `${categoryIndex}-${itemIndex}` ? 'primary.main' : 'transparent',
                          color: expanded === `${categoryIndex}-${itemIndex}` ? 'white' : 'text.primary',
                          transition: 'all 0.3s ease',
                          '& .MuiAccordionSummary-content': {
                            alignItems: 'center'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ 
                            mr: 2, 
                            display: 'flex',
                            '& svg': {
                              color: expanded === `${categoryIndex}-${itemIndex}` ? 'white' : 'primary.main'
                            }
                          }}>
                            {item.icon}
                          </Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600,
                              fontSize: '1.05rem'
                            }}
                          >
                            {item.question}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails sx={{ bgcolor: 'background.paper', p: 3 }}>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                          {item.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* Sección de ayuda adicional */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 5, 
            mb: 6, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <SupportAgentIcon sx={{ fontSize: 64, opacity: 0.9 }} />
              </Box>
              <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                ¿No encontraste lo que buscabas?
              </Typography>
              <Typography variant="body1" paragraph sx={{ opacity: 0.95, maxWidth: 600, mx: 'auto' }}>
                Nuestro equipo de soporte está listo para ayudarte con cualquier duda. 
                Contáctanos y te responderemos en menos de 24 horas.
              </Typography>
              <Button 
                component={Link} 
                href="/contact"
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  fontWeight: 'bold',
                  px: 5,
                  py: 1.5,
                  '&:hover': { bgcolor: 'grey.100' }
                }}
              >
                Contáctanos
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Botón de regreso */}
        <Box sx={{ textAlign: 'center' }}>
          <Button 
            component={Link} 
            href="/"
            variant="outlined" 
            color="primary"
            size="large"
            sx={{ px: 5 }}
          >
            Regresar al Inicio
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
