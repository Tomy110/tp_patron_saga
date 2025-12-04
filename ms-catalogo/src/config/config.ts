
import dotenv from "dotenv"

dotenv.config()

export const PORT = Number(process.env.CATALOGO_PORT) || 3001;