import { Request, Response } from "express";
import { CatalogoService } from "../services/catalogoService";

export class CatalogoController {
    static async get(req: Request, res: Response) {
        try {
            const catalogo = await CatalogoService.getAll();
            res.status(200).json(catalogo);
        } catch (error) {
            res.status(500).json({ message: 'Error al devolver catalogo', error });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const item = await CatalogoService.getById(id);
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(409).json({ message: 'No se encuentra' });
            }   
        } catch (error) {
            res.status(500).json({ message: 'Error al devolver catalogo', error });
        }  
    }
}
