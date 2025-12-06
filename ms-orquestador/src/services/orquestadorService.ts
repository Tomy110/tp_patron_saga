import { CATALOGO_URL } from "../config/config";
import { COMPRAS_URL } from "../config/config";
import { INVENTARIO_URL } from "../config/config";
import { PAGOS_URL } from "../config/config";


export class OrquestadorService {
    static async iniciarCompra(data: any) {
        const compraId = `COMPRA-${Date.now()}`;

        try {
            // Paso 1: Verificar producto en catálogo
            const catalogoRes = await fetch(`${CATALOGO_URL}/${data.productoId}`);
            const producto = await catalogoRes.json();

            if (!producto) {
                throw new Error('El producto no existe');
            }

            // Paso 2: Crear compra
            const compraRes = await fetch(COMPRAS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ compraId, monto: data.monto })
            });
            const compra = await compraRes.json();

            if (!compra.success) {
                throw new Error('Error al crear compra');
            }
            // Paso 3: Descontar inventario
            const inventarioRes = await fetch(INVENTARIO_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: data.productoId, cantidad: data.cantidad })
            });
            const inventario = await inventarioRes.json();

            if (!inventario.success) {
                // Si falla inventario, revertir compra
                await fetch(`${COMPRAS_URL}/${compra.compra.compraId}/compensar`, {
                    method: 'POST'
                });
                throw new Error(inventario.message);
            }

            // Paso 4: Procesar pago
            const pagoRes = await fetch(PAGOS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ monto: data.monto })
            });
            const pago = await pagoRes.json();

            if (!pago.success) {
                // Si falla pago, revertir todo
                await fetch(`${PAGOS_URL}/${pago.pago.pagoId}/compensar`, {
                    method: 'POST'
                });
                await fetch(`${COMPRAS_URL}/${compra.compra.compraId}/compensar`, {
                    method: 'POST'
                });
                throw new Error('Error al procesar pago');
            }
            return { 
                success: true, 
                compraId, 
                producto, 
                compra: compra.compra, 
                pago: pago.pago 
            };

        } catch (error) {
            return { 
                success: false, 
                message: error instanceof Error ? error.message : 'Error desconocido'
            };
        }
    }
}