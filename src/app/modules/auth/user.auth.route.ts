import express from 'express'
import { ERole } from '../../../enums/EnumUser'
import AuthorizationPermission from '../../middleware/authorizationService'
import { zodValidationHandler } from '../../middleware/zodValidationHandler'
import { authController } from './user.auth.controller'
import { authValidation } from './user.auth.validation'

const router = express.Router()

router.post(
  '/signin',
  zodValidationHandler(authValidation.loginValidation),
  authController.loginUser,
)



export const userAuthRouter = router
