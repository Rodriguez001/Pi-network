const jwt = require('jsonwebtoken');
const { messagesDB } = require('./database');

// Database storage instead of in-memory production
let conversations = {};

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
  } catch (error) {
    return null;
  }
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Check authentication
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Token manquant' })
    };
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  if (!decoded) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Token invalide' })
    };
  }

  const userId = decoded.userId;

  try {
    if (event.httpMethod === 'GET') {
      // Get user's messages from database
      const allMessages = await messagesDB.findAll();
      const userMessages = allMessages.filter(msg => msg.userId === userId);
      
      // Add welcome message if no messages exist
      if (userMessages.length === 0) {
        const welcomeMessage = await messagesDB.create({
          userId,
          sender: 'admin',
          message: 'Bienvenue ! Comment puis-je vous aider avec PI Network ?',
          read: false
        });
        userMessages.push(welcomeMessage);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          messages: userMessages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.createdAt).toLocaleString('fr-FR')
          }))
        })
      };

    } else if (event.httpMethod === 'POST') {
      const { message } = JSON.parse(event.body);

      if (!message || !message.trim()) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Message vide' })
        };
      }

      // Add user message to database
      const userMessage = await messagesDB.create({
        userId,
        sender: 'user',
        message: message.trim(),
        read: true
      });

      // Auto-reply from admin (simple bot responses)
      const autoReply = generateAutoReply(message);
      if (autoReply) {
        // Add admin reply to database
        await messagesDB.create({
          userId,
          sender: 'admin',
          message: autoReply,
          read: false
        });
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          message: {
            ...userMessage,
            timestamp: new Date(userMessage.createdAt).toLocaleString('fr-FR')
          }
        })
      };

    } else {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

  } catch (error) {
    console.error('Messages error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur serveur' })
    };
  }
};

function generateAutoReply(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes('bonjour') || msg.includes('salut') || msg.includes('hello')) {
    return 'Bonjour ! Ravi de vous parler. Comment puis-je vous aider avec PI Network ?';
  }
  
  if (msg.includes('code') || msg.includes('parrainage') || msg.includes('rodriguez003')) {
    return 'Mon code de parrainage est Rodriguez003. N\'hésitez pas à l\'utiliser lors de votre inscription sur PI Network !';
  }
  
  if (msg.includes('comment') && (msg.includes('miner') || msg.includes('commencer'))) {
    return 'Pour commencer à miner PI : 1) Téléchargez l\'app PI Network 2) Utilisez le code Rodriguez003 3) Appuyez sur le bouton de minage une fois par jour !';
  }
  
  if (msg.includes('merci')) {
    return 'De rien ! N\'hésitez pas si vous avez d\'autres questions sur PI Network.';
  }
  
  if (msg.includes('problème') || msg.includes('aide') || msg.includes('support')) {
    return 'Je suis là pour vous aider ! Pouvez-vous me décrire votre problème plus en détail ?';
  }
  
  return 'Merci pour votre message ! Je vous répondrai personnellement dès que possible. En attendant, n\'oubliez pas d\'utiliser le code Rodriguez003 !';
}
