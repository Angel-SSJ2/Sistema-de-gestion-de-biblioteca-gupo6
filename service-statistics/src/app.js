const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Conectado a MongoDB');

    app.listen(config.port, () => {
      console.log(`Servicio de Estadísticas corriendo en puerto ${config.port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
