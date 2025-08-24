const { reviewsDB } = require('./database');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Get all reviews from database
      const allReviews = await reviewsDB.findAll();
      const sortedReviews = allReviews
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(review => ({
          ...review,
          date: new Date(review.createdAt).toLocaleDateString('fr-FR')
        }));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reviews: sortedReviews })
      };

    } else if (event.httpMethod === 'POST') {
      const { name, rating, comment } = JSON.parse(event.body);

      // Validate input
      if (!comment || !rating || rating < 1 || rating > 5) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Données invalides' })
        };
      }

      // Create new review in database
      const newReview = await reviewsDB.create({
        name: name || 'Utilisateur anonyme',
        rating: parseInt(rating),
        comment: comment.trim(),
        verified: false
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'Avis ajouté avec succès',
          review: {
            ...newReview,
            date: new Date(newReview.createdAt).toLocaleDateString('fr-FR')
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
    console.error('Reviews error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur serveur' })
    };
  }
};
