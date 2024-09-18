import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { userModel } from './userModel';
import { equipmentModel } from './equipmentModel';

// Definir la interfaz para el modelo de mantenimiento.
export interface IMaintainModelAttributes {
  deviceId: number;
  maintenanceDate: Date;
  description: string;
  performedById: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IMaintainModelCreationAttributes = Optional<IMaintainModelAttributes, 'createdAt' | 'updatedAt'>;

// Definir el modelo
export class MaintainModel extends Model<IMaintainModelAttributes, IMaintainModelCreationAttributes> {
  declare deviceId: number;
  declare maintenanceDate: Date;
  declare description: string;
  declare performedById: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

// Inicialización del modelo
export function initMaintainModel(sequelize: Sequelize) {
  MaintainModel.init({
    deviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: equipmentModel,
        key: 'id',
      },
    },
    maintenanceDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    performedById: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: userModel,
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'MaintainModel',
    tableName: 'maintains',
    timestamps: true,
  });
}