import { Router } from 'express';
import routerVaccination from './Vaccination/StateRoutes.routes';


const router = Router();


router.use('/vaccination', routerVaccination);

export default router;
