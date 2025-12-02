import express, { Request,Response } from 'express';
import catalogoRouter from './routes/catalogoRoute';
import { PORT } from './config/config';

const app = express();
const port = PORT;

app.use(express.json());
app.use('/api/v1/catalogo', catalogoRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Servicio de Catalogo esta corriendo');
});

app.listen(port, () => {
    console.log(`Servicio de Catalogo esta escuchando en el puerto ${port}`);
});

export default app;

