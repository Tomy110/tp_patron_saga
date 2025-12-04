import dotenv from "dotenv"

dotenv.config()

export const PORT = Number(process.env.ORQUESTADOR_PORT) || 3000;

export const CATALOGO_URL = process.env.CATALOGO_URL || 'http://ms-catalogo:3001/api/v1/catalogo';
export const COMPRAS_URL = process.env.COMPRAS_URL || 'http://ms-compras:3002/api/v1/compra';
export const INVENTARIO_URL = process.env.INVENTARIO_URL || 'http://ms-inventario:3003/api/v1/inventario';
export const PAGOS_URL = process.env.PAGOS_URL || 'http://ms-pagos:3004/api/v1/pago';