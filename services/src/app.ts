import express from 'express';
import router from './routes/routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API funcionando!');
});

app.use('/api', router);

export default app;
