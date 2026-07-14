const statisticsService = require('../services/statisticsService');

const getMostLoanedBooks = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const stats = await statisticsService.getMostLoanedBooks(token);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
  }
};

const getLoansByCategory = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const stats = await statisticsService.getLoansByCategory(token);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estadísticas por categoría', error: error.message });
  }
};

module.exports = {
  getMostLoanedBooks,
  getLoansByCategory
};
