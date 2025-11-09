import { Request, Response } from 'express';
import { ComprasService } from '../services/comprasService';

export class ComprasController {
    static async transaccion(req: Request, res: Response) {
        try {
            const compras = await ComprasService.iniciarTransaccion(req.body);

            if (compras.success) {
                res.status(200).json(compras);
            } else{
                res.status(409).json({ compras, message: 'Fallo al registrar la compra' });
            }
    
        } catch (error) {
            res.status(500).json({ message: 'Error al procesar la compra', error });
        }
    }

    static async compensacion(req: Request, res: Response) {
        try {
            const { compraId } = req.body;
            
            const compensatedCompra = await ComprasService.ejecutarCompensacion(compraId);
            if(compensatedCompra){
                res.status(200).json({ 
                message: `Compensación exitosa para la compra ${compraId}.`, 
                compra: compensatedCompra});
            } 
        } catch (error) {
        res.status(500).json({ message: 'Error al compensar la compra', error });
        }  
    }
}
