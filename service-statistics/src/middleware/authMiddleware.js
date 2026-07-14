const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret, {
      issuer: 'BibliotecaAuthService',
      audience: 'BibliotecaAuthService'
    });
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido', error: error.message });
  }
};

module.exports = authMiddleware;
