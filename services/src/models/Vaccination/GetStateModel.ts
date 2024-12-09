import prisma from '../../config/prisma';

export const getAllEstados = async () => {
  return await prisma.estado.findMany({
    include: {
      cidades: {
        include: {
          pontos: true,
        },
      },
    },
  });
};

export const getEstadoByIdOrSigla = async (identifier: number | string) => {
  return await prisma.estado.findFirst({
    where: typeof identifier === 'number' ? { id: identifier } : { sigla: identifier },
    include: {
      cidades: {
        include: {
          pontos: true,
        },
      },
    },
  });
};


export const getPontosByCidadeId = async (cidadeId: number) => {
  return await prisma.pontoVacinacao.findMany({
    where: { cidadeId },
  });
};
