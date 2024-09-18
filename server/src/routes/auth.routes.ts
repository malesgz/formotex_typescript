import { Router } from "express";
import { login,register } from "../controllers/auth.controller";

const router= Router();

//Registro de usuario.
router.post('/register',register);
//Ruta de login.
router.post('/login',login)

export default router;