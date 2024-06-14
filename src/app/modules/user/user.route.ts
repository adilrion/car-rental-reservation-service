// user route
import express from 'express'

import adminAuthorizationMiddleware from '../../middleware/authorizationService'
import { zodValidationHandler } from '../../middleware/zodValidationHandler'
import { idRequestValidation } from '../../zodValidation/idRequestValidation'
import { userController } from './user.controller'
import {
  UserUpdateValidationSchema,
  UserValidationSchema,
} from './user.validation'
import { EnumUserRole } from '../../../enums/EnumUser'
import userAuthorizationMiddleware from '../../middleware/userAuthorization'

const route = express.Router()

// create user route
route.post(
  '/signup',
  zodValidationHandler(UserValidationSchema),
  userController.createNewUser,
)


// get all users routes
route.get(
  '/',
  adminAuthorizationMiddleware(
    EnumUserRole.ADMIN,
  ),
  userController.getAllUsers,
)

// get single user routes
route.get(
  '/:id',
  userAuthorizationMiddleware(),
  zodValidationHandler(idRequestValidation),
  userController.getSingleUser,
)

// update user routes
route.patch(
  '/update-user/:id',
  userAuthorizationMiddleware(),
  zodValidationHandler(idRequestValidation),
  zodValidationHandler(UserUpdateValidationSchema),
  userController.updateUser,
)

// delete user routes
route.delete(
  '/delete-user/:id',
  adminAuthorizationMiddleware(
    EnumUserRole.ADMIN,
  ),
  zodValidationHandler(idRequestValidation),
  userController.deleteUser,
)

export const userRouter = route
