import express from 'express'
import { zodValidationHandler } from '../../middleware/zodValidationHandler'
import { bookingValidation } from './booking.validation'
import { bookingController } from './booking.controller'
import AuthorizationPermission from '../../middleware/authorizationService'
import { ERole } from '../../../enums/EnumUser'


const router = express.Router()



router.post('/', AuthorizationPermission(ERole.USER), zodValidationHandler(bookingValidation), bookingController.createNewBooking)


router.get("/", AuthorizationPermission(ERole.ADMIN), bookingController.getAllBookings)

router.get("/my-bookings", AuthorizationPermission(ERole.USER), bookingController.getBookingByUserId)



export const bookingRouter = router