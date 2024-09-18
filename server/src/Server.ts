import express, {Application} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import sequelize, { connectDB } from '../src/database/dbConetion';
import { PORT } from '../src/config/dbConfig';
import '../src/models/equipmentModel'
import '../src/models/userModel'
//rutas
import router from '../src/routes/auth.routes';
import EquipoRouter from '../src/routes/equipment.routes';

//clase del servicio de mi aplicacion

class Server {
    private app: Application;
    public port:string|undefined

    constructor(){
        this.app= express();
        this.port=PORT;
        this.connectToDatabase();
        this.middlewares()
        this.routes();

    }

    // Configura middleware
    middlewares(): void {
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
        this.app.use(express.json())
    }

    //metodo para conectarce a la base de datos 
    private async connectToDatabase() {
        try {
            await connectDB();
            console.log('Conexión a la base de datos exitosa');
            //sincronizar los modelos 
            await sequelize.sync({force:false});
            console.log('Se crearon los modelos en las base de datos')
        } catch (error) {
            console.error('Error al conectar a la base de datos', error);
        }
    }
    //metodo para instaciar las rutas
    routes():void{
        this.app.use('/api',router)
        this.app.use('/api',EquipoRouter)
    }

    //iniciar servicio
    listen(){
        this.app.listen(this.port, ()=>console.log(`Servidor corriendo en http://localhost:${this.port} `))
    }
}
export default Server;