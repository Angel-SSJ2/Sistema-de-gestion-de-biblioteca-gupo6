`use strict`;

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { conexionDB } from './db.js';
import { opcionesCors } from './cors-configuration.js';
import { configurarHelmet } from './helmet-configuration.js';
import { limitePeticiones } from '../middlewares/request-limit.js';
import { manejarErrores } from '../middlewares/handle-errors.js';

import rutasLibros from '../src/books/book.routes.js';
import rutasPrestamos from '../src/loans/loan.routes.js';
import rutasUsuarios from '../src/users/user.routes.js';

const configurarMiddlewares = (app) => {
    app.use(configurarHelmet());
    app.use(cors(opcionesCors));
    app.use(express.json({ limit: '10mb' }));
    app.use(limitePeticiones);
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(morgan('dev'));
};

const configurarRutas = (app) => {
    const URL_BASE = '/api/v1';

    app.use(`${URL_BASE}/books`, rutasLibros);
    app.use(`${URL_BASE}/loans`, rutasPrestamos);
    app.use(`${URL_BASE}/users`, rutasUsuarios);

    app.get(`${URL_BASE}/check`, (req, res) => {
        res.status(200).json({ message: 'Servicio de Biblioteca funcionando correctamente' });
    });

};

export const initServer = async () => {
    const app = express();
    const PUERTO = process.env.PORT || 3001;

    try {
        await conexionDB();
        configurarMiddlewares(app);
        configurarRutas(app);
        app.use(manejarErrores);

        app.listen(PUERTO, () => {
            console.log(`Servicio de Biblioteca corriendo en el puerto ${PUERTO}`);
        });
    } catch (error) {
        console.error('Error al iniciar el Servicio de Biblioteca:', error);
    }
};
