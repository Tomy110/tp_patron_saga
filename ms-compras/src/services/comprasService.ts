import { Compra, NewCompraData } from '../types';

let nextId = 100;
const comprasDB: Compra[] = [];

export const comprasService = {
    compras: comprasDB,

    iniciarTransaccion(data: NewCompraData): Promise<{ success: boolean, compra?: Compra }> {
        return new Promise((resolve) => {
            const isSuccessful = Math.random() > 0.2;

            if (isSuccessful) {
                const newCompra: Compra = {
                    id: String(nextId++),
                    status: 'COMPLETED',
                    ...data,
                };
                this.compras.push(newCompra);
                resolve({ success: true, compra: newCompra });
            } else {
                resolve({ success: false});
            }
        });
    },

    ejecutarCompensacion(compraId: string): Promise<Compra | boolean> { 
        return new Promise((resolve) => {
            const compra = this.compras.find(c => c.compraId === compraId);
            if (compra) {
                if (compra.status !== 'COMPENSATED') {
                compra.status = 'COMPENSATED';
            }
            }
            resolve(true);
        });
    }
};

export class ComprasService {
    static async iniciarTransaccion(data: NewCompraData): Promise<{ success: boolean, compra?: Compra }> {
        return comprasService.iniciarTransaccion(data);
    }
    static async ejecutarCompensacion(compraId: string): Promise<Compra | boolean> {
        return comprasService.ejecutarCompensacion(compraId);
    }
}
