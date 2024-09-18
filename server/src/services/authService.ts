import { Hashing } from "../utils/hash";
import { addJWT } from "../utils/jwt";
import { ILogin } from "../interfaces/authInterface";
import UserService from "./userService";

class AuthService {
    private readonly hashing: Hashing;

    constructor() {
        this.hashing = new Hashing();
    }

    async register(userData: { email: string; password: string }) {
        const hashedPassword = await this.hashing.hashPassword(userData.password);
        const newUser = await UserService.createUser({ ...userData, password: hashedPassword });
        return newUser;
    }

    async login(user: ILogin) {
        const userDetails = await UserService.getUserByEmailAndPassword(user);
        const token = await addJWT({ user: userDetails.id });
        return token;
    }
}

export default new AuthService();