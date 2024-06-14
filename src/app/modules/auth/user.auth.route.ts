import express from 'express'
import { EnumUserRole } from '../../../enums/EnumUser'
import adminAuthorizationMiddleware from '../../middleware/authorizationService'
import { zodValidationHandler } from '../../middleware/zodValidationHandler'
import { authValidation } from './user.auth.validation'
import { authController } from './user.auth.controller'

const router = express.Router()

router.post(
  '/login',
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
  adminAuthorizationMiddleware(
    EnumUserRole.ADMIN,
  ),
  zodValidationHandler(authValidation.changePasswordValidation),
  authController.changePassword,
)

export const userAuthRouter = router
