require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3002,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/biblioteca-statistics',
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  serviceAUrl: process.env.SERVICE_A_URL || 'http://localhost:3001'
};
