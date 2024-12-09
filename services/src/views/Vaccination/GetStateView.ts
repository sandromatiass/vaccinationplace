import { Request, Response } from 'express';
import { getAllEstados, getEstadoByIdOrSigla, getPontosByCidadeId } from '../../models/Vaccination/GetStateModel';
import prisma from '../../config/prisma';


export const listarEstados = async (req: Request, res: Response): Promise<void> => {
  try {
    const estados = await prisma.estado.findMany({
      include: {
        cidades: true,  
      },
    });

    res.status(200).json(estados);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar os estados.' });
  }
};


export const buscarEstado = async (req: Request, res: Response): Promise<void> => {
  const { identifier } = req.params;  

  try {
    const estado = await getEstadoByIdOrSigla(
      isNaN(Number(identifier)) ? identifier : Number(identifier)
    );

    res.status(200).json(estado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o estado.' });
  }
};


export const listarPontosPorCidade = async (req: Request, res: Response): Promise<void> => {
  const { cidadeId } = req.params;  // A cidadeId é recebida via parâmetro de URL.

  try {
    const pontos = await getPontosByCidadeId(Number(cidadeId));

    res.status(200).json(pontos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar os pontos de vacinação.' });
  }
};