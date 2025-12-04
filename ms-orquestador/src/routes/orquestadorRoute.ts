import express from 'express'
import { OrquestadorController } from '../controllers/orquestadorController'

const orquestadorRouter = express.Router()

orquestadorRouter.get('/compra', OrquestadorController.crearCompra)

export default orquestadorRouter;