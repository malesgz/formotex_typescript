import Equipos from '../models/equipmentModel';
import { IEquiposInformaticos, IWithoutIdEquiposInformaticos } from '../types/interfaces';

class EquiposService {
    async createEquipos(data: IWithoutIdEquiposInformaticos): Promise<IEquiposInformaticos> {
        try {
            const equipo = await Equipos.create(data as any);
            return equipo;
        } catch (error) {
            throw new Error('Error al crear el equipo');
        }
    }

    async getAllEquipos(): Promise<IEquiposInformaticos[]> {
        try {
            return await Equipos.findAll() as IEquiposInformaticos[];
        } catch (error) {
            throw new Error('Error al mostrar los equipos');
        }
    }

    async getEquipoById(id: number): Promise<IEquiposInformaticos | null> {
        try {
            return await Equipos.findByPk(id) as IEquiposInformaticos | null;
        } catch (error) {
            throw new Error('Error al obtener el equipo');
        }
    }

    async updateEquipos(id: number, data: Partial<IWithoutIdEquiposInformaticos>): Promise<IEquiposInformaticos> {
        try {
            const equipo = await Equipos.findByPk(id);
            if (!equipo) throw new Error('Equipo no encontrado');
            await equipo.update(data);
            return equipo as IEquiposInformaticos;
        } catch (error) {
            throw new Error('Error al actualizar el equipo');
        }
    }

    async deleteEquipos(id: number): Promise<IEquiposInformaticos> {
        try {
            const equipo = await Equipos.findByPk(id);
            if (!equipo) throw new Error('Equipo no encontrado');
            await equipo.destroy();
            return equipo as IEquiposInformaticos;
        } catch (error) {
            throw new Error('Error al eliminar el equipo');
        }
    }
}

export default new EquiposService();