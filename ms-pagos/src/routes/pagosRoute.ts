import { Router } from 'express';
import { PagosController } from '../controllers/pagosController'

const router = Router();

router.post('/transaccion', PagosController.transaccion);
router.post('/compensacion', PagosController.compensacion);

export default router;