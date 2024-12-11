
export const corsConfig = {
    origin: function (origin, callback) {
        const whitelist = [process.env.FRONTEND_URL];

        if (!origin||whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de Cors'));
        }
    }
};
