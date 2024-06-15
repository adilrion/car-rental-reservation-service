/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import config from '../../../config'
import { ApiResponse } from '../../../shared/apiResponse'
import { TryCatchHandler } from '../../../shared/tryCatchHandler'
import { IUser } from '../user/user.interface'

import { authService } from './user.auth.service'

const loginUser: RequestHandler = TryCatchHandler(async (req, res) => {
  const { ...loginUser } = req.body

  const { refreshToken, accessToken, ...result } = await authService.loginService(loginUser)
  const isProduction = config.env === 'production'
  const cookieOptions = {
    secure: isProduction,
    httpOnly: true,
    sameSite: isProduction ? 'none' : ('lax' as 'none' | 'lax'),
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  }

  if (refreshToken) {
    res.cookie('refreshToken', refreshToken, cookieOptions)
  }
  
  ApiResponse<Partial<IUser>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
    token: accessToken,
  })
})



export const authController = {
  loginUser
}
