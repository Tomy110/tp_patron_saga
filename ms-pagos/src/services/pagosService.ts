import { Pago, NewPagoData } from '../types';

let nextId = 1000;
const pagosDB: Pago[] = [];

export const pagosLogic = {
    pagos: pagosDB,
    iniciarTransaccion(data: NewPagoData): Promise<{ success: boolean, pago?: Pago }> {
        return new Promise((resolve) => {
            const isSuccessful = Math.random() > 0.2;

            if (isSuccessful) {
                const newPago: Pago = {
                    id: String(nextId++),
                    pagoId: `PAG-${Date.now()}`, 
                    status: 'COMPLETADO',
                    ...data,
                };
                this.pagos.push(newPago);
                resolve({ success: true, pago: newPago });
            } else {
                resolve({ success: false }); 
            }
        });
    },

    ejecutarCompensacion(pagoId: string): Promise<Pago | boolean> { 
        return new Promise((resolve) => {
            const pago = this.pagos.find(p => p.pagoId === pagoId); 

            if (pago) {
                if (pago.status !== 'COMPENSADO') {
                    pago.status = 'COMPENSADO';
                }
                resolve(pago); 
            } else {
                resolve(true); 
            }
        });
    }
};

export class PagosService {
    static async iniciarTransaccion(data: NewPagoData): Promise<{ success: boolean, pago?: Pago }> {
        return pagosLogic.iniciarTransaccion(data);
    }
    static async ejecutarCompensacion(pagoId: string): Promise<Pago | boolean> {
        return pagosLogic.ejecutarCompensacion(pagoId);
    }
}