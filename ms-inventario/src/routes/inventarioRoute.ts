import { Router } from 'express';
import { actualizarStockController } from '../controllers/inventarioController';

const router = Router();
router.post('/actualizar', actualizarStockController);

export default router;