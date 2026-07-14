const summaryService = require('../services/summaryService');

const getSummary = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const summary = await summaryService.getLibrarySummary(token);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el resumen', error: error.message });
  }
};

module.exports = { getSummary };
