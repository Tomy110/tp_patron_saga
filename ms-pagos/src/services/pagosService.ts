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
                    status: 'COMPLETED',
                    ...data,
                };
                this.pagos.push(newPago);
                console.log(`[MS-Pagos] Transacción exitosa: Pago ${newPago.pagoId} registrado.`);
                resolve({ success: true, pago: newPago });
            } else {
                console.warn(`[MS-Pagos] Transacción fallida simulada.`);
                resolve({ success: false }); 
            }
        });
    },

    ejecutarCompensacion(pagoId: string): Promise<Pago | boolean> { 
        return new Promise((resolve) => {
            const pago = this.pagos.find(p => p.pagoId === pagoId); 

            if (pago) {
                if (pago.status !== 'COMPENSATED') {
                    pago.status = 'COMPENSATED';
                    console.log(`[MS-Pagos] Compensación exitosa: Pago ${pagoId} marcado como REEMBOLSADO.`);
                }
                resolve(pago); 
            } else {
                console.warn(`[MS-Pagos] Compensación: Pago ${pagoId} no encontrado. Asumiendo éxito.`);
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