import { DataTypes, Model, Sequelize } from 'sequelize';

export class userModel extends Model {

    declare name: string;
    declare address: string;
    declare password: string;

    static initModel(instacia: Sequelize) {
        userModel.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize: instacia,
            modelName: 'userModel',
            tableName: 'users',
            timestamps: false,
        })
    }
}