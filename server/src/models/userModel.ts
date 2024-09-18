import { Model, DataTypes, Sequelize } from 'sequelize';

// Interfaz para el usuario.
export interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    createdAt?: Date;
    updatedAt?: Date;
}

// Definición del modelo de usuario.
export class userModel extends Model<IUser> {
    declare username: string;
    declare email: string;
    declare password: string;
    declare role: 'admin' | 'user';
    declare done?: boolean;
    declare createdAt?: Date;
    declare updatedAt?: Date;

    static initModel(sequelize: Sequelize) {
        userModel.init({
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('admin', 'user'),
                allowNull: false,
                defaultValue: 'user',
            },
        }, {
            sequelize,
            modelName: 'userModel',
            tableName: 'users',
            timestamps: true,
        });
    }
}