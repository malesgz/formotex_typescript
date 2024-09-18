import { Model, DataTypes } from "sequelize";
import sequelize from "../database/dbConetion";
import { IUser,IWithoutIdUser } from "../types/interfaces";
import bcrypt from 'bcryptjs'

//Modelo user.
class User extends Model<IUser,IWithoutIdUser> implements IUser{
    public id!:number;
    public username!: string;
    public password!: string;
    public role!:'admin'|'user';

    //Comparar la contraseña mediante un método.
    public async compararPass(PassIngresUser:string): Promise<boolean>{
        return bcrypt.compare(PassIngresUser, this.password);
    }
}


User.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type:DataTypes.ENUM('admin','user'),
        defaultValue:'user',
    }
},{
    sequelize,
    modelName:'User',
    tableName:'users',
});
export default User;