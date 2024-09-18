import { Request, Response } from 'express';
// import AuthService from '../services/AuthService';
// import { ILogin } from '../interface/AuthInterface';
import { userModel } from '../models/userModel';

export const ctrlAuthRegister = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Nos aseguramos que el cuerpo cumpla con la interfaz
        const user = req.body;

        await AuthService.register(user);

        return res.status(201).json({
            message: "Registro correcto"
        });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;

        return res.status(statusCode).json({
            message: error.message,
            status: error.status
        });
    }
}

export const ctrlAuthLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Nos aseguramos que el cuerpo cumpla con la interfaz
        const user: ILogin = req.body;
        
        const token = await AuthService.login(user);

        return res.status(200).json({
            message: "Login correcto",
            token
        });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;

        return res.status(statusCode).json({
            message: error.message,
            status: error.status
        });
    }
}