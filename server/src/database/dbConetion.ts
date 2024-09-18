import { Sequelize } from 'sequelize';
import { URI } from '../config/dbConfig';

// Configuración del sequelize.
const sequelize = new Sequelize(URI as string, {
  dialect: 'postgres',
  logging: false, 
});

// Función para conectar a la base de datos.
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

export default sequelize;