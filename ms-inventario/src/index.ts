import express, { Request,Response } from 'express';
import { PORT } from './config/config';
import inventarioRoutes from './routes/inventarioRoute';

const app = express();
const port = PORT;

app.use(express.json());

app.use('/api/v1/inventario', inventarioRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Servicio de inventario esta corriendo');
});


app.listen(port, () => {
    console.log(`Servicio de inventario esta escuchando en el puerto ${port}`);
});

export default app;