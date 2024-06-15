import express from 'express'
import { carController } from './car.controller'
import AuthorizationPermission from '../../middleware/authorizationService';
import { ERole } from '../../../enums/EnumUser';
import { zodValidationHandler } from '../../middleware/zodValidationHandler';
import { CarUpdateValidation, CarValidation } from './car.validationt';
import { bookingController } from '../booking/booking.controller';


const router = express.Router()


router.put('/return', AuthorizationPermission(ERole.ADMIN), bookingController.calculateCarReturn);
router.post('/', zodValidationHandler(CarValidation), AuthorizationPermission(ERole.ADMIN),  carController.createNewCar);
router.get('/', carController.getAllCars);
router.get('/:id', carController.getSingleCar);
router.patch('/:id', zodValidationHandler(CarUpdateValidation), AuthorizationPermission(ERole.ADMIN), carController.updateCar);
router.delete('/:id', AuthorizationPermission(ERole.ADMIN), carController.deleteCar);




export const carRouter = router;