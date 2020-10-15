import { Router } from 'express'
import OrphanagesController from './controllers/OrphanagesController';
import multer from 'multer';
import uploadConfig from './config/upload';

const routes = Router()
const upload = multer(uploadConfig);

routes.post('/orphanages',upload.array('images'), OrphanagesController.create);

routes.get('/orphanages/:id', OrphanagesController.show);
routes.get('/orphanages', OrphanagesController.index);

export default routes;


// {
// 	"name":"Lar das meninas",
// 	"latitude":-23.4778756 ,
// 	"longitude":-46.2953356,
// 	"about": "Sobre o orfanato",
// 	"instructions": "Traz dindinha",
// 	"opening_hours":"Das 8h as 18h",
// 	"open_on_weekends": true
// }