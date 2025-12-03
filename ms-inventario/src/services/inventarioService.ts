import { DescontarStockData } from '../types';

const inventarioService = {

    actualizarStock(data: DescontarStockData): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
        const isSuccessful = Math.random() > 0.2;

        if (isSuccessful) {
            resolve({ success: true, message: 'Inventario actualizado' });
        } else {
            resolve({ success: false, message: 'Sin stock' });
        }
    });
    },
};

export class InventarioService {
    static async actualizarStock(data: DescontarStockData): Promise<{ success: boolean; message: string }> {
    return inventarioService.actualizarStock(data);
    }
}