import mongoose from 'mongoose';
import logger from './logger.js';

export const conexionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info('MongoDB | Conexión exitosa.');
    } catch (error) {
        logger.error('MongoDB | Conexión fallida: ', error.message);
        process.exit(1);
    }
};
