import express from 'express'
import { OrquestadorController } from '../controllers/orquestadorController'

const orquestadorRouter = express.Router()

orquestadorRouter.post('/compra', OrquestadorController.crearCompra)

export default orquestadorRouter;