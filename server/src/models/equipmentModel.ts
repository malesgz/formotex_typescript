import { Model, DataTypes, Sequelize } from 'sequelize';

// Interfaz para el dispositivo.
export interface IDevice {
    id?: number;
    mark: string;
    model: string;
    status: 'activo' | 'reparación' | 'de baja';
    ubication: string;
    adquisition_date: Date;
    assignedTo?: number; 
    createdAt?: Date;
    updatedAt?: Date;
}

// Definición del modelo de dispositivo.
export class equipmentModel extends Model<IDevice> {
    declare mark: string;
    declare model: string;
    declare status: 'activo' | 'reparación' | 'de baja';
    declare ubication: string;
    declare adquisition_date: Date;
    declare assignedTo?: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;

    static initModel(sequelize: Sequelize) {
        equipmentModel.init({
            mark: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('activo', 'reparación', 'de baja'),
                allowNull: false,
            },
            ubication: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            adquisition_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            assignedTo: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'User',
                    key: 'id',
                },
            }
        }, {
            sequelize,
            modelName: 'equipmentModel',
            tableName: 'equipments',
            timestamps: true,
        });
    }
}