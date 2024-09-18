import { Hashing } from "../utils/hash";
import { ILogin } from "../interfaces/authInterface";
import User from "../models/userModel";

class userService {
    private readonly hashing: Hashing;

    constructor() {
        this.hashing = new Hashing();
    }

    async getUserByEmailAndPassword({ email, password }: ILogin) {
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isPasswordValid = await this.hashing.comparePasswords(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        return user;
    }

    async createUser(userData: { email: string; password: string }) {
        const existingUser = await User.findOne({
            where: { email: userData.email }
        });

        if (existingUser) {
            throw new Error('El correo ya está en uso');
        }

        const hashedPassword = await this.hashing.hashPassword(userData.password);
        const newUser = await User.create({ ...userData, password: hashedPassword });
        
        return newUser;
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async getUserById(userId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return user;
    }

    async updateUser(userId: number, updateData: { email?: string; password?: string }) {
        if (updateData.password) {
            updateData.password = await this.hashing.hashPassword(updateData.password);
        }

        const [affectedCount, [updatedUser]] = await User.update(updateData, {
            where: { id: userId },
            returning: true
        });

        if (affectedCount === 0) {
            throw new Error('Usuario no encontrado');
        }

        return updatedUser;
    }

    async deleteUser(userId: number) {
        const deletedCount = await User.destroy({
            where: { id: userId }
        });

        if (deletedCount === 0) {
            throw new Error('Usuario no encontrado');
        }
    }
}

export default new userService();