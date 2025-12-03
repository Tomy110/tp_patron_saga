import { Request, Response } from 'express';
import { InventarioService } from '../services/inventarioService';
import { DescontarStockData } from '../types';

export const actualizarStockController = async (req: Request, res: Response) => {
    try {
    const data: DescontarStockData = req.body;

    const resultado = await InventarioService.actualizarStock(data);

    if (resultado.success) {
        return res.status(200).json({ message: resultado.message });
    } else {
        return res.status(409).json({ message: resultado.message });
    }
    } catch (error) {
    return res.status(500).json({ message: 'Error interno en ms-inventario' });
    }
};