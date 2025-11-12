import express from 'express';
import pagosRoutes from './routes/pagosRoute'; 
import { PORT } from './config/config';

const SERVICE_NAME = 'MS-PAGOS';

const app = express();
app.use(express.json());
app.use('/api/pagos', pagosRoutes);


app.listen(PORT, () => {
    console.log(`${SERVICE_NAME} iniciado en puerto ${PORT}`);
    console.log(`URL Base: http://localhost:${PORT}/api/pagos`);
});