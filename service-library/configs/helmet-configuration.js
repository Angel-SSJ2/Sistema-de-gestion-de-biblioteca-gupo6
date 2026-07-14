import helmet from 'helmet';

export const configurarHelmet = () => {
    return helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false
    });
};
