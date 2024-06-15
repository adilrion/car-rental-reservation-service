import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ApiResponse } from '../../shared/apiResponse'

export const ApiNotFoundError = (req: Request, res: Response) => {
  ApiResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: 'Not Found',
    // data: [
    //   {
    //     path: req.originalUrl,
    //     message: 'Not Found',
    //   },
    // ],
  })
}
