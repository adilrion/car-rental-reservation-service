import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ApiResponse } from '../../shared/apiResponse'

export const ApiNotFoundError = (req: Request, res: Response) => {
  ApiResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: 'API Not Found',
    data: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
}
