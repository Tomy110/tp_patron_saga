import { DescontarStockData } from '../types';

const inventarioService = {

    actualizarStock(data: DescontarStockData): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      const latencia = Math.random() * 1000;
        setTimeout(() => {
        const isSuccessful = Math.random() > 0.2;

        if (isSuccessful) {
            console.log(`[ms-inventario] Stock actualizado (simulado) para:`, data);
            resolve({ success: true, message: 'Inventario actualizado' });
        } else {
            console.log(`[ms-inventario] Fallo: Sin stock (simulado) para:`, data);
            resolve({ success: false, message: 'Sin stock' });
        }
        }, latencia);
    });
    },
};

export class InventarioService {
    static async actualizarStock(data: DescontarStockData): Promise<{ success: boolean; message: string }> {
    return inventarioService.actualizarStock(data);
    }
}