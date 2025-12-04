import { Request, Response } from 'express';
import { OrquestadorService } from '../services/orquestadorService';

export class OrquestadorController {
    static async crearCompra(req: Request, res: Response) {
        try {
            const orquestador = await OrquestadorService.iniciarCompra(req.body);

            if (orquestador.success) {
                res.status(200).json(orquestador);
            } else{
                res.status(409).json({ orquestador, message: 'Compra fallida, se ejecuta compensacion' });
            }
    
        } catch (error) {
            res.status(500).json({ message: 'Error en el orquestador', error });
        }
    }

}