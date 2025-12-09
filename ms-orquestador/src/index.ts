import express, {Request, Response} from 'express';
import orquestadorRoutes from './routes/orquestadorRoute';
import {PORT} from './config/config';
import cors from 'cors';

const app = express();
const port = PORT;

app.use(express.json());
app.use(cors());
app.use('/api/v1/orquestador', orquestadorRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Servicio de Orquestador esta corriendo');
});

app.listen(port, () => {
    console.log(`Servicio de Orquestador esta escuchando en el puerto ${port}`);
});

export default app;