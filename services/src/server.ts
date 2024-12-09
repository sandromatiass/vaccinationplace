import app from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3334;

app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log('Banco de dados conectado com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar no banco:', error);
        process.exit(1);
    }
});
