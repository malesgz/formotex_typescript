// Interfaz con los atributos del usuario.
export interface IUser {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'user';
}

// Interfaz con los atributos del usuario excepto el id.
export interface IWithoutIdUser extends Omit<IUser, 'id'> {}

// Interfaz con los atributos de los equipos informáticos.
export interface IEquiposInformaticos {
    id: number;
    name: string;
    type: string;
    status: 'disponible' | 'en_reparacion' | 'asignado';
    location: string;
    fechaCompra: Date;
}

// Interfaz con los atributos de los equipos informáticos excepto el id.
export interface IWithoutIdEquiposInformaticos extends Omit<IEquiposInformaticos, 'id'> {}

