import { CATALOGO_URL, COMPRAS_URL, INVENTARIO_URL, PAGOS_URL } from "../config/config";

export class OrquestadorService {
    static async procesarCompra(data: any) {
        const compraId = `COMPRA-${Date.now()}`;
        const pagoId = `PAGO-${Date.now()}`;
        let compraCreada: any = null;

        try {
            // Paso 1: Verificar producto en catálogo
            console.log(`Verificando producto: ${data.productoId}`);
            const catalogoRes = await fetch(`${CATALOGO_URL}/${data.productoId}`);
            if (!catalogoRes.ok) {
                throw new Error('El producto no existe en catálogo');
            }
            const producto = await catalogoRes.json();

            // Paso 2: Crear compra
            console.log(`Creando compra...`);
            const compraRes = await fetch(`${COMPRAS_URL}/transaccion`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    compraId,
                    usuarioId: data.usuarioId,
                    productoId: data.productoId,
                    cantidad: data.cantidad,
                    precio: data.precio
                })
            });
            const compraData = await compraRes.json();
            if (!compraData.success) {
                throw new Error('Error al crear compra');
            }
            compraCreada = compraData;

            // Paso 3: Procesar pago
            console.log(`Procesando pago...`);
            const pagoRes = await fetch(`${PAGOS_URL}/transaccion`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pagoId,
                    compraId,
                    monto: data.cantidad * data.precio,
                    usuarioId: data.usuarioId
                })
            });
            const pagoData = await pagoRes.json();
            if (!pagoData.success) {
                // Compensar compra
                await fetch(`${COMPRAS_URL}/compensacion`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ compraId })
                });
                throw new Error('Error al procesar pago');
            }

            // Paso 4: Descontar inventario
            console.log(`Actualizando inventario...`);
            const inventarioRes = await fetch(`${INVENTARIO_URL}/actualizar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productoId: data.productoId,
                    cantidad: data.cantidad
                })
            });
            const inventarioData = await inventarioRes.json();
            if (!inventarioRes.ok) {
                // Compensar pago y compra
                await fetch(`${PAGOS_URL}/compensacion`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pagoId })
                });
                await fetch(`${COMPRAS_URL}/compensacion`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ compraId })
                });
                throw new Error('Error al actualizar inventario');
            }

            console.log(`Compra completada exitosamente`);
            return {
                success: true,
                compraId,
                pagoId,
                message: 'Compra realizada exitosamente'
            };

        } catch (error) {
            console.error(`Error en la compra:`, error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Error desconocido en la transacción'
            };
        }
    }
}