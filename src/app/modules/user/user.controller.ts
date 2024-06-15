/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RequestHandler } from 'express'
import { ApiResponse } from '../../../shared/apiResponse'
import { TryCatchHandler } from '../../../shared/tryCatchHandler'
import { IUser } from './user.interface'
import { UserService } from './user.service'

const createNewUser: RequestHandler = TryCatchHandler(async (req, res) => {
  const user = req.body
  const result = await UserService.createUser(user)

  ApiResponse<IUser>(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})







// get single user controller
const getSingleUser: RequestHandler = TryCatchHandler(async (req, res) => {
  const id = req.params.id
  const result = await UserService.getSingleUser(id)
  ApiResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved Successfully',
    data: result,
  })
})

// update user controller
const updateUser: RequestHandler = TryCatchHandler(async (req, res) => {
  const id = req.params.id
  const user = req.body
  const reqUser = req.user
  const result = await UserService.updateUser(id, user, reqUser)
  ApiResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User Updated Successfully',
    data: result,
  })
})

// delete user controller
const deleteUser: RequestHandler = TryCatchHandler(async (req, res) => {
  const id = req.params.id
  const result = await UserService.deleteUser(id)
  ApiResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User Deleted Successfully',
    data: result,
  })
})

export const userController = {
  createNewUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
