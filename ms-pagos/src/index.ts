import express, { Request,Response } from 'express';
import pagosRoutes from './routes/pagosRoute'; 
import { PORT } from './config/config';


const app = express();
const port = PORT;

app.use(express.json());
app.use('/api/pagos', pagosRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Servicio de compras esta corriendo');
});


app.listen(port, () => {
    console.log(`Servicio de compras esta escuchando en el puerto ${port}`);
});

export default app;
