import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/dbConfig';
import { equipmentModel } from '../models/equipmentModel';
import { initMaintainModel } from '../models/maintainModel';
import { userModel } from '../models/userModel';

export class DbConnection {
    public sequelize: Sequelize;

    constructor() {
        const dbUri = dbConfig.getEnvDataBase().dbUri;

        this.sequelize = new Sequelize(dbUri, {
            dialect: 'postgres',
            logging: false,
        });

        // Inicializar los modelos
        equipmentModel.initModel(this.sequelize);
        userModel.initModel(this.sequelize);
        initMaintainModel(this.sequelize);
    }

    async connectDb(): Promise<void> {
        try {
            await this.sequelize.authenticate();
            console.log('Conexión a la base de datos establecida correctamente.');

            // Sincronizar modelos con la base de datos.
            // { force: true } solo en desarrollo.
            await this.sequelize.sync({ force: false }); 
            console.log('Modelos sincronizados con la base de datos.');
        } catch (error) {
            console.error('No se pudo conectar a la base de datos:', error);
        }
    }
}

export const dbConnection = new DbConnection();