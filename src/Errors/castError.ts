import mongoose from 'mongoose'
import { IErrorGenericResponseInterface } from '../interfaces/errorGenericResponseInterface'
import { IErrorInterface } from '../interfaces/errorInterface'

export const castError = (
  error: mongoose.Error.CastError,
): IErrorGenericResponseInterface => {
  const errors: IErrorInterface[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ]

  return {
    statusCode: 400,
    message: 'Cast Error!',
    errorMessage: errors,
  }
}
