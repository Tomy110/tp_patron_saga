import dotenv from "dotenv"

dotenv.config()

export const PORT = Number(process.env.INVENTARIO_PORT) || 3003;