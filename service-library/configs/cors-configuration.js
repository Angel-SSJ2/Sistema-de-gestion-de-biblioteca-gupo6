export const opcionesCors = {
    origin: function (origen, callback) {
        const origenesPermitidos = process.env.ALLOWED_ORIGINS 
            ? process.env.ALLOWED_ORIGINS.split(',') 
            : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'];
        
        if (!origen || origenesPermitidos.includes(origen)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true
};
