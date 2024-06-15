// user service to save user on the database

import httpStatus from 'http-status'
import ApiError from '../../../Errors/apiError'
import {  IUser } from './user.interface'
import { UserModel } from './user.model'

// Create a new user to maintain databases
const createUser = async (user: IUser): Promise<IUser | null> => {


  const newUser = await UserModel.create(user)
  if (!newUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to create user!')
  }

  return newUser
}




// get single user from the database
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const user = await UserModel.findById(id)
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'user not found')
  return user
}

// update user
const updateUser = async (
  id: string,
  data: IUser,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reqUser: any,
): Promise<IUser | null> => {
  const isDataExist = await UserModel.findById(id)
  if (!isDataExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  } else if (reqUser?._id !== id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
  }
  const response = await UserModel.findByIdAndUpdate(
    { _id: id },
    {
      ...data,
      updatedAt: new Date(),
    },
    { new: true },
  )
  return response
}

// delete user
const deleteUser = async (id: string): Promise<IUser | null> => {
  const isDataExist = await UserModel.findById(id)
  if (!isDataExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }
  const response = await UserModel.findByIdAndDelete(id)
  if (!response) {
    throw new ApiError(httpStatus.FAILED_DEPENDENCY, 'Failed to delete user!')
  }
  return response
}

export const UserService = {
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
