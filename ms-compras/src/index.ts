import express, { Request,Response } from 'express';
import comprasRouter from './routes/comprasRoute';
import { PORT } from './config/config';

const app = express();
const port = PORT;

app.use(express.json());
app.use('/api/v1/compra', comprasRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Compras Service is running');
});

app.listen(port, () => {
    console.log(`Compras Service is listening on port ${port}`);
});

export default app;
