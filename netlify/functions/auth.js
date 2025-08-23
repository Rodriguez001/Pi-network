const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { usersDB } = require('./database');

// Database storage instead of in-memory

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { action, email, password, name } = JSON.parse(event.body);

    if (action === 'register') {
      // Check if user already exists
      const existingUser = await usersDB.findByEmail(email);
      if (existingUser) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Utilisateur déjà existant' })
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user in database
      const user = await usersDB.create({
        name,
        email,
        password: hashedPassword
      });

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          token,
          user: { id: user.id, name: user.name, email: user.email }
        })
      };

    } else if (action === 'login') {
      // Find user in database
      const user = await usersDB.findByEmail(email);
      if (!user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Email ou mot de passe incorrect' })
        };
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Email ou mot de passe incorrect' })
        };
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          token,
          user: { id: user.id, name: user.name, email: user.email }
        })
      };

    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Action non valide' })
      };
    }

  } catch (error) {
    console.error('Auth error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur serveur' })
    };
  }
};
