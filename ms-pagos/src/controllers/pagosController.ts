import { Request, Response } from 'express';
import { PagosService } from '../services/pagosService';

export class PagosController {

    static async transaccion(req: Request, res: Response) {
        try {
            const result = await PagosService.iniciarTransaccion(req.body);

            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(409).json({ 
                    result, 
                    message: 'Fallo al procesar el pago' 
                });
            }
    
        } catch (error) {
            console.error('Error en controlador de pago:', error);
            res.status(500).json({ message: 'Error interno al procesar el pago', error });
        }
    }

    static async compensacion(req: Request, res: Response) {
        try {
            const { pagoId } = req.body; 
            
            const compensatedPago = await PagosService.ejecutarCompensacion(pagoId);
            
            if(compensatedPago){ 
                res.status(200).json({ 
                    message: `Compensacion exitosa para el pago ${pagoId}.`, 
                    pago: compensatedPago
                });
            } 
        } catch (error) {
            console.error('Error en controlador de compensacion:', error);
            res.status(500).json({ message: 'Error al compensar el pago', error });
        }  
    }
}