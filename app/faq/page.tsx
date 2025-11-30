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
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  InputAdornment,
  Alert,
  Snackbar,
  Badge
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
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ForumIcon from '@mui/icons-material/Forum';

// Estructura para FAQs con categorías actualizadas para Supplie.me
const faqCategories = [
  {
    id: 'general',
    name: 'General',
    icon: <HelpOutlineIcon />,
    color: '#F97316',
    items: [
      {
        id: 'g1',
        question: '¿Qué es Supplie.me?',
        answer: 'Supplie.me es una plataforma tecnológica diseñada para empoderar a dueños de tiendas de abarrotes y pequeños comercios. Ofrecemos un sistema integral que incluye gestión de inventario, punto de venta, tienda virtual y herramientas de análisis para hacer crecer tu negocio.',
        icon: <StorefrontIcon color="primary" />,
        likes: 45,
        views: 234
      },
      {
        id: 'g2',
        question: '¿Para quién está diseñado Supplie.me?',
        answer: 'Supplie.me está diseñado principalmente para tiendas de abarrotes, misceláneas, minimercados y pequeños comercios que quieran digitalizar su operación y tener un mejor control de su negocio. Es ideal para comerciantes que buscan crecer sin complicaciones tecnológicas.',
        icon: <HelpOutlineIcon color="primary" />,
        likes: 38,
        views: 189
      },
      {
        id: 'g3',
        question: '¿Cómo puedo empezar a usar Supplie.me?',
        answer: 'Es muy fácil. Puedes solicitar una demo gratuita desde nuestra página de contacto. Un miembro de nuestro equipo te contactará para mostrarte la plataforma y ayudarte a configurar tu tienda. También puedes registrarte como beta tester para probar las nuevas funcionalidades.',
        icon: <RocketLaunchIcon color="primary" />,
        likes: 52,
        views: 312
      },
      {
        id: 'g4',
        question: '¿Necesito conocimientos técnicos para usar Supplie.me?',
        answer: 'No, para nada. Supplie.me está diseñado pensando en la simplicidad. Si sabes usar un teléfono celular o una computadora básica, puedes usar nuestra plataforma. Además, ofrecemos capacitación gratuita y soporte continuo.',
        icon: <DevicesIcon color="primary" />,
        likes: 67,
        views: 401
      }
    ]
  },
  {
    id: 'funcionalidades',
    name: 'Funcionalidades',
    icon: <InventoryIcon />,
    color: '#2196F3',
    items: [
      {
        id: 'f1',
        question: '¿Qué incluye el sistema de inventario?',
        answer: 'Nuestro sistema de inventario te permite:\n• Registrar todos tus productos con código de barras\n• Control de stock en tiempo real\n• Alertas automáticas cuando un producto está por agotarse\n• Reportes de movimientos y rotación de productos\n• Historial completo de todas las transacciones\n• Categorización de productos\n• Precios y descuentos personalizables',
        icon: <InventoryIcon color="primary" />,
        likes: 89,
        views: 567
      },
      {
        id: 'f2',
        question: '¿Puedo vender en línea con Supplie.me?',
        answer: 'Sí, Supplie.me incluye una tienda virtual integrada donde tus clientes pueden ver tus productos, hacer pedidos y coordinar la entrega o recogida. Tu tienda estará disponible 24/7 sin necesidad de conocimientos técnicos de tu parte. Los clientes pueden pagar en línea o al recibir su pedido.',
        icon: <StorefrontIcon color="primary" />,
        likes: 76,
        views: 489
      },
      {
        id: 'f3',
        question: '¿Funciona en dispositivos móviles?',
        answer: 'Absolutamente. Supplie.me está diseñado con un enfoque "mobile-first", lo que significa que funciona perfectamente en smartphones, tablets y computadoras. Puedes gestionar tu negocio desde cualquier dispositivo con conexión a internet, incluso mientras estás fuera de la tienda.',
        icon: <DevicesIcon color="primary" />,
        likes: 54,
        views: 345
      },
      {
        id: 'f4',
        question: '¿Puedo gestionar múltiples tiendas?',
        answer: 'Sí, nuestra plataforma permite gestionar múltiples sucursales desde un solo panel de control. Puedes ver el inventario consolidado, transferir productos entre tiendas y comparar el rendimiento de cada una.',
        icon: <StorefrontIcon color="primary" />,
        likes: 41,
        views: 234
      },
      {
        id: 'f5',
        question: '¿Qué reportes y análisis puedo obtener?',
        answer: 'Supplie.me ofrece reportes completos que incluyen:\n• Ventas diarias, semanales y mensuales\n• Productos más vendidos\n• Análisis de rentabilidad\n• Tendencias de ventas\n• Rotación de inventario\n• Clientes frecuentes\n• Comparativas por período',
        icon: <InventoryIcon color="primary" />,
        likes: 63,
        views: 389
      }
    ]
  },
  {
    id: 'precios',
    name: 'Precios y Pagos',
    icon: <PaymentIcon />,
    color: '#4CAF50',
    items: [
      {
        id: 'p1',
        question: '¿Cuánto cuesta Supplie.me?',
        answer: 'Actualmente estamos en fase de lanzamiento y ofrecemos acceso gratuito a nuestros beta testers. Próximamente lanzaremos planes accesibles diseñados específicamente para pequeños comerciantes, empezando desde $299 MXN mensuales. Contáctanos para conocer más detalles y ser parte de los primeros usuarios.',
        icon: <PaymentIcon color="primary" />,
        likes: 112,
        views: 789
      },
      {
        id: 'p2',
        question: '¿Qué métodos de pago aceptan mis clientes?',
        answer: 'La tienda virtual de Supplie.me permite que tus clientes paguen de múltiples formas:\n• Efectivo al recibir\n• Transferencia bancaria\n• Pago en tienda\n• Tarjeta de crédito/débito (próximamente)\n• Mercado Pago (próximamente)',
        icon: <PaymentIcon color="primary" />,
        likes: 58,
        views: 423
      },
      {
        id: 'p3',
        question: '¿Hay costos ocultos o comisiones por venta?',
        answer: 'No. En Supplie.me creemos en la transparencia total. Los costos de la plataforma son fijos mensuales y no cobramos comisiones por cada venta que realices. Tu ganancia es 100% tuya.',
        icon: <PaymentIcon color="primary" />,
        likes: 94,
        views: 612
      },
      {
        id: 'p4',
        question: '¿Puedo cancelar en cualquier momento?',
        answer: 'Sí, no hay contratos de permanencia. Puedes cancelar tu suscripción cuando lo desees. Si cancelas, tendrás acceso hasta el final del período que ya pagaste y podrás exportar todos tus datos.',
        icon: <PaymentIcon color="primary" />,
        likes: 47,
        views: 298
      }
    ]
  },
  {
    id: 'soporte',
    name: 'Soporte y Seguridad',
    icon: <SupportAgentIcon />,
    color: '#9C27B0',
    items: [
      {
        id: 's1',
        question: '¿Mis datos están seguros?',
        answer: 'La seguridad es nuestra máxima prioridad. Implementamos:\n• Encriptación SSL/TLS en todas las comunicaciones\n• Respaldos automáticos diarios de toda tu información\n• Servidores seguros con certificaciones internacionales\n• Acceso restringido solo para usuarios autorizados\n• Cumplimiento con las mejores prácticas de la industria',
        icon: <SecurityIcon color="primary" />,
        likes: 78,
        views: 534
      },
      {
        id: 's2',
        question: '¿Qué tipo de soporte ofrecen?',
        answer: 'Ofrecemos soporte integral:\n• Chat en vivo: Lunes a Viernes 9:00 AM - 6:00 PM\n• WhatsApp: Respuesta en menos de 1 hora\n• Email: contacto@supplie.me\n• Base de conocimientos con tutoriales en video\n• Capacitación inicial gratuita\n• Webinars mensuales con tips y novedades',
        icon: <SupportAgentIcon color="primary" />,
        likes: 65,
        views: 456
      },
      {
        id: 's3',
        question: '¿Qué pasa si tengo un problema técnico?',
        answer: 'Nuestro equipo de soporte está disponible para ayudarte. Puedes reportar cualquier problema a través del chat en la plataforma, WhatsApp o email. Nos comprometemos a:\n• Responder en menos de 1 hora en horario laboral\n• Resolver problemas críticos en menos de 4 horas\n• Seguimiento hasta la resolución completa',
        icon: <SupportAgentIcon color="primary" />,
        likes: 52,
        views: 378
      },
      {
        id: 's4',
        question: '¿Puedo acceder a mi tienda si no tengo internet?',
        answer: 'Estamos trabajando en un modo offline que te permitirá registrar ventas sin conexión y sincronizar cuando tengas internet. Por ahora, necesitas conexión a internet para usar la plataforma, pero funciona bien incluso con conexiones lentas.',
        icon: <DevicesIcon color="primary" />,
        likes: 89,
        views: 623
      }
    ]
  }
];

// Estadísticas del foro
const forumStats = {
  totalQuestions: faqCategories.reduce((acc, cat) => acc + cat.items.length, 0),
  totalAnswered: faqCategories.reduce((acc, cat) => acc + cat.items.length, 0),
  totalLikes: faqCategories.reduce((acc, cat) => acc + cat.items.reduce((a, i) => a + i.likes, 0), 0),
  totalViews: faqCategories.reduce((acc, cat) => acc + cat.items.reduce((a, i) => a + i.views, 0), 0),
};

export default function FAQ() {
  const [currentTab, setCurrentTab] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ question: '', category: 'general' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [likedQuestions, setLikedQuestions] = useState<string[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    setExpanded(false);
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleLike = (questionId: string) => {
    if (likedQuestions.includes(questionId)) {
      setLikedQuestions(prev => prev.filter(id => id !== questionId));
    } else {
      setLikedQuestions(prev => [...prev, questionId]);
      setSnackbar({ open: true, message: '¡Gracias por tu voto!' });
    }
  };

  const handleSubmitQuestion = () => {
    if (newQuestion.question.trim()) {
      setSnackbar({ open: true, message: '¡Pregunta enviada! Te responderemos pronto.' });
      setDialogOpen(false);
      setNewQuestion({ question: '', category: 'general' });
    }
  };

  // Filtrar preguntas por búsqueda
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  const hasResults = filteredCategories.some(cat => cat.items.length > 0);

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header con título y estadísticas */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <ForumIcon sx={{ fontSize: 60, color: 'primary.main' }} />
          </Box>
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
            Centro de Ayuda
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
            Preguntas frecuentes y foro de la comunidad Supplie.me
          </Typography>

          {/* Estadísticas del foro */}
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            {[
              { icon: <QuestionAnswerIcon />, value: forumStats.totalQuestions, label: 'Preguntas' },
              { icon: <ThumbUpIcon />, value: forumStats.totalLikes, label: 'Votos útiles' },
              { icon: <VisibilityIcon />, value: forumStats.totalViews.toLocaleString(), label: 'Visualizaciones' }
            ].map((stat, index) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    textAlign: 'center', 
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 1 }}>{stat.icon}</Box>
                  <Typography variant="h5" fontWeight="bold">{stat.value}</Typography>
                  <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Barra de búsqueda y botón de nueva pregunta */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                placeholder="Buscar en preguntas frecuentes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'background.default'
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => setDialogOpen(true)}
                sx={{ 
                  py: 1.8,
                  borderRadius: 2,
                  fontWeight: 'bold'
                }}
              >
                Hacer una Pregunta
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Pestañas de categorías */}
        <Box sx={{ mb: 4 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              mb: 4,
              '& .MuiTab-root': {
                borderRadius: 2,
                mr: 1,
                textTransform: 'none',
                fontWeight: 600,
                minHeight: 56,
                px: 3
              },
              '& .Mui-selected': {
                bgcolor: 'primary.main',
                color: 'white !important'
              }
            }}
          >
            {filteredCategories.map((category, index) => (
              <Tab 
                key={index} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {category.name}
                    <Chip 
                      label={category.items.length} 
                      size="small" 
                      sx={{ 
                        height: 20, 
                        fontSize: '0.7rem',
                        bgcolor: currentTab === index ? 'rgba(255,255,255,0.3)' : 'grey.200'
                      }} 
                    />
                  </Box>
                }
                icon={category.icon} 
                iconPosition="start"
              />
            ))}
          </Tabs>

          {/* No hay resultados */}
          {searchQuery && !hasResults && (
            <Alert severity="info" sx={{ mb: 4 }}>
              No se encontraron preguntas que coincidan con "{searchQuery}". 
              ¿Por qué no haces tu pregunta directamente?
            </Alert>
          )}

          {/* Contenido de las pestañas */}
          {filteredCategories.map((category, categoryIndex) => (
            <Box 
              key={categoryIndex} 
              role="tabpanel"
              hidden={currentTab !== categoryIndex}
              sx={{ transition: 'all 0.3s ease' }}
            >
              {currentTab === categoryIndex && category.items.length > 0 && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      bgcolor: category.color + '15',
                      color: category.color,
                      display: 'flex'
                    }}>
                      {category.icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" component="h2" fontWeight="bold">
                        {category.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.items.length} preguntas en esta categoría
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ mb: 3 }} />

                  {category.items.map((item, itemIndex) => (
                    <Accordion 
                      key={item.id}
                      expanded={expanded === `${categoryIndex}-${itemIndex}`}
                      onChange={handleAccordionChange(`${categoryIndex}-${itemIndex}`)}
                      sx={{ 
                        mb: 2, 
                        borderRadius: '16px !important',
                        overflow: 'hidden',
                        boxShadow: 'none',
                        border: '1px solid',
                        borderColor: expanded === `${categoryIndex}-${itemIndex}` ? 'primary.main' : 'divider',
                        '&:before': { display: 'none' },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon 
                            sx={{ 
                              color: expanded === `${categoryIndex}-${itemIndex}` ? 'white' : 'primary.main' 
                            }} 
                          />
                        }
                        sx={{ 
                          bgcolor: expanded === `${categoryIndex}-${itemIndex}` ? 'primary.main' : 'transparent',
                          color: expanded === `${categoryIndex}-${itemIndex}` ? 'white' : 'text.primary',
                          transition: 'all 0.3s ease',
                          minHeight: 72,
                          '& .MuiAccordionSummary-content': {
                            alignItems: 'center',
                            my: 2
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                          <Box sx={{ 
                            mr: 2, 
                            display: 'flex',
                            '& svg': {
                              color: expanded === `${categoryIndex}-${itemIndex}` ? 'white' : 'primary.main'
                            }
                          }}>
                            {item.icon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography 
                              variant="subtitle1" 
                              sx={{ 
                                fontWeight: 600,
                                lineHeight: 1.4
                              }}
                            >
                              {item.question}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  opacity: 0.7,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5
                                }}
                              >
                                <ThumbUpOutlinedIcon sx={{ fontSize: 14 }} />
                                {item.likes + (likedQuestions.includes(item.id) ? 1 : 0)}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  opacity: 0.7,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5
                                }}
                              >
                                <VisibilityIcon sx={{ fontSize: 14 }} />
                                {item.views}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails sx={{ bgcolor: 'background.paper', p: 3 }}>
                        <Typography 
                          variant="body1" 
                          color="text.secondary" 
                          sx={{ 
                            lineHeight: 1.8,
                            whiteSpace: 'pre-line'
                          }}
                        >
                          {item.answer}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            ¿Te resultó útil esta respuesta?
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title={likedQuestions.includes(item.id) ? "Ya votaste" : "Marcar como útil"}>
                              <IconButton 
                                size="small" 
                                onClick={() => handleLike(item.id)}
                                color={likedQuestions.includes(item.id) ? "primary" : "default"}
                              >
                                {likedQuestions.includes(item.id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                              </IconButton>
                            </Tooltip>
                            <Chip 
                              label={`${item.likes + (likedQuestions.includes(item.id) ? 1 : 0)} útil`} 
                              size="small" 
                              color={likedQuestions.includes(item.id) ? "primary" : "default"}
                            />
                          </Box>
                        </Box>
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
                Puedes hacer tu pregunta en el foro o contactarnos directamente.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={() => setDialogOpen(true)}
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    '&:hover': { bgcolor: 'grey.100' }
                  }}
                >
                  Hacer Pregunta
                </Button>
                <Button 
                  component={Link} 
                  href="/contact"
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'white' }
                  }}
                >
                  Contactar Soporte
                </Button>
              </Box>
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

      {/* Dialog para nueva pregunta */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <QuestionAnswerIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Hacer una Pregunta
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Tu pregunta será revisada por nuestro equipo y publicada en el foro. 
            Te notificaremos cuando tengamos una respuesta.
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={newQuestion.category}
              label="Categoría"
              onChange={(e) => setNewQuestion(prev => ({ ...prev, category: e.target.value }))}
            >
              {faqCategories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {cat.icon}
                    {cat.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Tu pregunta"
            placeholder="Escribe tu pregunta aquí..."
            value={newQuestion.question}
            onChange={(e) => setNewQuestion(prev => ({ ...prev, question: e.target.value }))}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmitQuestion}
            disabled={!newQuestion.question.trim()}
          >
            Enviar Pregunta
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar de confirmación */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
}
