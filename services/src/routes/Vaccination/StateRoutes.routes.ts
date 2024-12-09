import { Router } from 'express';
import {
  listarEstados,
  buscarEstado,
  listarPontosPorCidade,
} from '../../views/Vaccination/GetStateView';
import { cadastrarEstado } from '../../views/Vaccination/PostStateView';

const routerVaccination = Router();

routerVaccination.post('/create-points', cadastrarEstado)
routerVaccination.get('/estados', listarEstados); 
routerVaccination.get('/estados/:identifier', buscarEstado);
routerVaccination.get('/cidades/:cidadeId/pontos', listarPontosPorCidade);

export default routerVaccination;