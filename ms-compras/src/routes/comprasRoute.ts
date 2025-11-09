import express from 'express'
import { ComprasController } from '../controllers/comprasController'

const comprasRouter = express.Router()

comprasRouter.post('/transaccion', ComprasController.transaccion)
comprasRouter.post('/compensacion', ComprasController.compensacion)

export default comprasRouter;