import { Model,DataTypes } from "sequelize";
import sequelize from "../database/dbConetion";
import { IEquiposInformaticos } from "../types/interfaces";

class Equipos extends Model<IEquiposInformaticos> implements IEquiposInformaticos{
    public id!: number;
    public name!: string;
    public type!: string;
    public status!: "disponible" | "en_reparacion" | "asignado";
    public location!: string;
    public fechaCompra!: Date;
}

Equipos.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM("disponible","en_reparacion", "asignado"),
        allowNull:false,
    },
    location:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    fechaCompra:{
        type:DataTypes.DATE,
        allowNull:false,
    },
},{
    sequelize,
    modelName:'Equipos',
    tableName:'equipos',
});
export default Equipos;