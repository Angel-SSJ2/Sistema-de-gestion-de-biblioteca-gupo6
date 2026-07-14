const recommendationService = require('../services/recommendationService');

const getRecommendations = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category || category.trim().length === 0) {
      return res.status(400).json({ message: 'La categoría es requerida' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const recommendations = await recommendationService.getRecommendationsByCategory(category, token);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener recomendaciones', error: error.message });
  }
};

module.exports = { getRecommendations };
