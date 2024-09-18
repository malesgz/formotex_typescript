import { IDevice } from "../models/equipmentModel"; // Ajusta la ruta según tu configuración
import Equipment from "../models/equipmentModel";

class EquipmentService {

    constructor() {}

    async createDevice(deviceData: IDevice): Promise<IDevice> {
        const existingDevice = await Equipment.findOne({
            where: { serialNumber: deviceData.serialNumber }
        });
        
        if (existingDevice) {
            throw new Error('El dispositivo con ese número de serie ya existe');
        }

        const newDevice = await Equipment.create(deviceData);
        return newDevice;
    }

    async getAllDevices(): Promise<IDevice[]> {
        return await Equipment.findAll();
    }

    async getDeviceById(deviceId: number): Promise<IDevice> {
        const device = await Equipment.findByPk(deviceId);
        
        if (!device) {
            throw new Error('Dispositivo no encontrado');
        }
        
        return device;
    }

    async updateDevice(deviceId: number, updateData: Partial<IDevice>): Promise<IDevice> {
        const [affectedCount, [updatedDevice]] = await Equipment.update(updateData, {
            where: { id: deviceId },
            returning: true
        });

        if (affectedCount === 0) {
            throw new Error('Dispositivo no encontrado');
        }

        return updatedDevice;
    }

    async deleteDevice(deviceId: number): Promise<void> {
        const deletedCount = await Equipment.destroy({
            where: { id: deviceId }
        });
        
        if (deletedCount === 0) {
            throw new Error('Dispositivo no encontrado');
        }
    }

    async getDevicesByUser(userId: number): Promise<IDevice[]> {
        return await Equipment.findAll({
            where: { assignedTo: userId }
        });
    }
}

export default new EquipmentService();