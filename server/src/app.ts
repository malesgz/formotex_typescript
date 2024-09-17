import { dbConnection } from './database/db';

const startServer = async () => {
    await dbConnection.connectDb();
    // Aquí puedes agregar la inicialización del servidor si la tienes
};

startServer();