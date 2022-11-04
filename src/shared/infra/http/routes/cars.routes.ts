import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarsSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarsSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const upload = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarsSpecificationController = new CreateCarsSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarsSpecificationController.handle);

carsRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, upload.array('images'), uploadCarImagesController.handle);

export { carsRoutes };
