import { Response } from 'express'
import { ApiResponseType } from '../interfaces/apiResponse'

export const ApiResponse = <T>(res: Response, data: ApiResponseType<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data?.message || null,
    ...(data?.data && { data: data.data }),
    ...(data?.token && { token: data.token }),
  })
}
