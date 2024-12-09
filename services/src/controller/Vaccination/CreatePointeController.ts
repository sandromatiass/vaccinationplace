import { Request, Response } from 'express';
import { createEstado } from '../../models/Vaccination/PostStateModel';


export const cadastrarEstado = async (req: Request, res: Response) => {
  try {

    console.log('Dados recebidos do front-end:', req.body);


    const estadoCriado = await createEstado(req.body);

    console.log('Estado criado com sucesso:', estadoCriado);


    return res.status(201).json({ message: 'Estado criado com sucesso!', data: estadoCriado });
  } catch (error) {

    console.error('Erro ao tentar criar o estado:', error);
  }
};
