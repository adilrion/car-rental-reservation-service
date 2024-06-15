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

router.post(
  '/create-refresh-token',
  authController.refreshToken,
)

router.post('/reset-password/:token', authController.updatePassword)

// reset password router
router.post(
  '/reset-password',
  zodValidationHandler(authValidation.resetPasswordValidation),
  authController.resetPassword,
)

router.post(
  '/logout',
  zodValidationHandler(authValidation.refreshTokenValidation),
  authController.logoutUser,
)

router.patch(
  '/change-password',
  AuthorizationPermission(
    ERole.ADMIN,
  ),
  zodValidationHandler(authValidation.changePasswordValidation),
  authController.changePassword,
)

export const userAuthRouter = router
