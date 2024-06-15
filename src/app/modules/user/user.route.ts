// user route
import express from 'express'

import { ERole } from '../../../enums/EnumUser'
import AuthorizationPermission from '../../middleware/authorizationService'
import { zodValidationHandler } from '../../middleware/zodValidationHandler'
import { idRequestValidation } from '../../zodValidation/idRequestValidation'
import { userController } from './user.controller'
import {
  UserUpdateValidationSchema,
  UserValidationSchema,
} from './user.validation'

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
  AuthorizationPermission(
    ERole.ADMIN,
  ),
  userController.getAllUsers,
)

// get single user routes
route.get(
  '/:id',
  zodValidationHandler(idRequestValidation),
  userController.getSingleUser,
)

// update user routes
route.patch(
  '/update-user/:id',
  zodValidationHandler(idRequestValidation),
  zodValidationHandler(UserUpdateValidationSchema),
  userController.updateUser,
)

// delete user routes
route.delete(
  '/delete-user/:id',
  AuthorizationPermission(
    ERole.ADMIN,
  ),
  zodValidationHandler(idRequestValidation),
  userController.deleteUser,
)

export const userRouter = route
