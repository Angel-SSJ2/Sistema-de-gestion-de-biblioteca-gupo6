const healthCheck = (req, res) => {
  res.json({ message: 'Service Statistics running' });
};

module.exports = { healthCheck };
