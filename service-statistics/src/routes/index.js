const express = require('express');
const router = express.Router();
const healthRoutes = require('./healthRoutes');
const statisticsRoutes = require('./statisticsRoutes');
const recommendationRoutes = require('./recommendationRoutes');
const summaryRoutes = require('./summaryRoutes');

router.use('/', healthRoutes);
router.use('/statistics', statisticsRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/summary', summaryRoutes);

module.exports = router;
