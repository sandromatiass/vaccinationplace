import { Request, Response } from 'express';
import { createEstado } from '../../models/Vaccination/PostStateModel';

export const cadastrarEstado = async (req: Request, res: Response) => {
  const { nome, sigla, cidades } = req.body;

  try {
    const estado = await createEstado({ nome, sigla, cidades });
    res.status(201).json(estado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar o estado.' });
  }
};
