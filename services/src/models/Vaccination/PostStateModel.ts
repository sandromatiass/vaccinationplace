import prisma from '../../config/prisma';

interface PontoVacinacao {
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
}

interface Cidade {
  nome: string;
  pontos: PontoVacinacao[];
}

interface Estado {
  nome: string;
  sigla: string;
  cidades: Cidade[];
}

export const createEstado = async (data: Estado) => {
  const estado = await prisma.estado.create({
    data: {
      nome: data.nome,
      sigla: data.sigla,
      cidades: {
        create: data.cidades.map((cidade) => ({
          nome: cidade.nome,
          pontos: {
            create: cidade.pontos.map((ponto) => ({
              nome: ponto.nome,
              endereco: ponto.endereco,
              telefone: ponto.telefone,
              email: ponto.email,
            })),
          },
        })),
      },
    },
  });

  return estado;
};
