'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Fab,
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Badge,
  Avatar,
  Slide,
  Fade,
  Divider,
  Chip,
  CircularProgress
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Respuestas automáticas del bot (versión cliente)
const botResponses: Record<string, string> = {
  'hola': '¡Hola! 👋 Bienvenido a Supplie.me. ¿En qué puedo ayudarte hoy?',
  'precio': 'Actualmente estamos en fase beta y el acceso es gratuito. Pronto lanzaremos planes accesibles para pequeños comerciantes. ¿Te gustaría ser parte de nuestros beta testers?',
  'demo': '¡Excelente! Para solicitar una demo, puedes contactarnos en contacto@supplie.me o a través de nuestro formulario de contacto. Un miembro de nuestro equipo te contactará pronto.',
  'inventario': 'Nuestro sistema de inventario te permite controlar stock en tiempo real, recibir alertas de productos bajos, generar reportes y mucho más. ¿Te gustaría ver una demostración?',
  'ayuda': 'Estoy aquí para ayudarte. Puedes preguntarme sobre:\n• Precios y planes\n• Funcionalidades del sistema\n• Cómo solicitar una demo\n• Soporte técnico',
  'gracias': '¡De nada! 😊 Si tienes más preguntas, no dudes en escribir. ¡Estamos para ayudarte!',
  'tienda': 'Con Supplie.me puedes crear tu tienda virtual y vender en línea las 24 horas. Tus clientes podrán ver productos, hacer pedidos y coordinar entregas.',
  'contacto': 'Puedes contactarnos por:\n📧 Email: contacto@supplie.me\n📱 WhatsApp: +52 55 1234 5678\n🌐 Web: supplie.me/contacto',
  'funciones': 'Supplie.me ofrece:\n✅ Gestión de inventario\n✅ Punto de venta\n✅ Tienda virtual\n✅ Reportes y análisis\n✅ Alertas de stock bajo\n✅ Gestión de clientes',
  'soporte': 'Ofrecemos soporte por email, WhatsApp y chat en vivo. Nuestro horario es Lunes a Viernes de 9:00 AM a 6:00 PM.',
};

const quickResponses = [
  '¿Qué es Supplie.me?',
  '¿Cuánto cuesta?',
  'Quiero una demo',
  '¿Qué funciones tiene?'
];

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Buscar respuesta específica
  for (const [keyword, response] of Object.entries(botResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  // Respuestas para preguntas específicas
  if (lowerMessage.includes('qué es') || lowerMessage.includes('que es')) {
    return 'Supplie.me es una plataforma tecnológica diseñada para empoderar a dueños de tiendas de abarrotes y pequeños comercios. Ofrecemos un sistema integral que incluye gestión de inventario, punto de venta, tienda virtual y herramientas de análisis.';
  }
  
  if (lowerMessage.includes('cómo') || lowerMessage.includes('como')) {
    return 'Para empezar con Supplie.me:\n1️⃣ Solicita una demo gratuita\n2️⃣ Configura tu tienda\n3️⃣ Agrega tus productos\n4️⃣ ¡Empieza a vender!\n\n¿Te gustaría que te contactemos?';
  }
  
  // Respuesta por defecto
  return 'Gracias por tu mensaje. ¿Puedo ayudarte con información sobre nuestros servicios, precios o cómo solicitar una demo?';
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '¡Hola! 👋 Soy el asistente virtual de Supplie.me. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages.length, isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular delay del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(userMessage.content),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickResponse = (response: string) => {
    setInputValue(response);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = '5512345678';
    const message = 'Hola, me gustaría obtener más información sobre Supplie.me';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Chat Window */}
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={10}
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: { xs: 'calc(100% - 40px)', sm: 380 },
            maxWidth: 380,
            height: { xs: 'calc(100vh - 180px)', sm: 520 },
            maxHeight: 520,
            borderRadius: 3,
            overflow: 'hidden',
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
                <SmartToyIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Asistente Supplie.me
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  🟢 En línea
                </Typography>
              </Box>
            </Box>
            <IconButton color="inherit" onClick={handleToggle}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              bgcolor: '#f5f7fb',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5
            }}
          >
            {messages.map((message) => (
              <Fade in key={message.id}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    gap: 1
                  }}
                >
                  {message.sender === 'bot' && (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      <SmartToyIcon fontSize="small" />
                    </Avatar>
                  )}
                  <Paper
                    elevation={1}
                    sx={{
                      p: 1.5,
                      maxWidth: '75%',
                      bgcolor: message.sender === 'user' ? 'primary.main' : 'white',
                      color: message.sender === 'user' ? 'white' : 'text.primary',
                      borderRadius: 2,
                      borderTopLeftRadius: message.sender === 'bot' ? 0 : 16,
                      borderTopRightRadius: message.sender === 'user' ? 0 : 16
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {message.content}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        opacity: 0.7, 
                        display: 'block', 
                        mt: 0.5,
                        textAlign: message.sender === 'user' ? 'right' : 'left'
                      }}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Paper>
                  {message.sender === 'user' && (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.400' }}>
                      <PersonIcon fontSize="small" />
                    </Avatar>
                  )}
                </Box>
              </Fade>
            ))}
            
            {isTyping && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  <SmartToyIcon fontSize="small" />
                </Avatar>
                <Paper sx={{ p: 1.5, bgcolor: 'white', borderRadius: 2, borderTopLeftRadius: 0 }}>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <CircularProgress size={8} />
                    <CircularProgress size={8} sx={{ animationDelay: '0.2s' }} />
                    <CircularProgress size={8} sx={{ animationDelay: '0.4s' }} />
                  </Box>
                </Paper>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>

          {/* Quick Responses */}
          {messages.length === 1 && (
            <Box sx={{ p: 1.5, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                Preguntas rápidas:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {quickResponses.map((response, index) => (
                  <Chip
                    key={index}
                    label={response}
                    size="small"
                    onClick={() => handleQuickResponse(response)}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'primary.light', color: 'white' }
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Divider />

          {/* Input Area */}
          <Box sx={{ p: 1.5, bgcolor: 'white', display: 'flex', gap: 1, alignItems: 'flex-end' }}>
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Escribe tu mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3
                }
              }}
            />
            <IconButton 
              color="primary" 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>

          {/* WhatsApp Option */}
          <Box sx={{ p: 1, bgcolor: 'grey.100', textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              ¿Prefieres hablar con una persona?{' '}
              <Box
                component="span"
                onClick={handleWhatsApp}
                sx={{ 
                  color: '#25D366', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <WhatsAppIcon sx={{ fontSize: 16 }} />
                WhatsApp
              </Box>
            </Typography>
          </Box>
        </Paper>
      </Slide>

      {/* Floating Button */}
      <Badge 
        badgeContent={unreadCount} 
        color="error"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000
        }}
      >
        <Fab
          color="primary"
          aria-label="chat"
          onClick={handleToggle}
          sx={{
            width: 60,
            height: 60,
            boxShadow: '0 4px 20px rgba(255, 87, 34, 0.4)',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: '0 6px 25px rgba(255, 87, 34, 0.5)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </Fab>
      </Badge>
    </>
  );
}

