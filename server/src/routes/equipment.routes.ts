import { Router } from 'express';
import { createEquipos,deleteEquipos,updateEquipos, getEquipos,getEquipoById} from '../controllers/equipo.controller';
import { authenticateJWT } from '../middleware/auth.middleware';
import { verifyAdminRole } from '../middleware/admin.middleware';

const router = Router();

// Rutas de los equipos informaticos.
router.get('/equipos', getEquipos);
router.get('/equipos/:id', authenticateJWT, verifyAdminRole, getEquipoById); 
router.post('/equipos', authenticateJWT, verifyAdminRole, createEquipos);
router.put('/equipos/:id', authenticateJWT, verifyAdminRole, updateEquipos);
router.delete('/equipos/:id', authenticateJWT, verifyAdminRole, deleteEquipos);

export default router;