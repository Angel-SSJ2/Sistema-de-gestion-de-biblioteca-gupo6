const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getMostLoanedBooks, getLoansByCategory } = require('../controllers/statisticsController');

router.get('/', authMiddleware, getMostLoanedBooks);
router.get('/categories', authMiddleware, getLoansByCategory);

module.exports = router;
