import express from 'express';
import { PORT } from './config/config';
import inventarioRoutes from './routes/inventarioRoute';

const app = express();

app.use(express.json());

app.use('/api/inventario', inventarioRoutes);

app.listen(PORT, () => {
    console.log(`--- Microservicio 'ms-inventario' corriendo en http://localhost:${PORT} ---`);
});