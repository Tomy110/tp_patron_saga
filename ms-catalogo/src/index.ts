import express, { Request,Response } from 'express';
import catalogoRouter from './routes/catalogoRoute';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/v1/catalogo', catalogoRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Catalog Service is running');
});

app.listen(port, () => {
    console.log(`Catalog Service is listening on port ${port}`);
});

export default app;

