import express from 'express'
import { CatalogoController } from '../controllers/catalogoController'

const catalogoRouter = express.Router()

catalogoRouter.get('/', CatalogoController.get)
catalogoRouter.get('/:id', CatalogoController.getById)


export default catalogoRouter;