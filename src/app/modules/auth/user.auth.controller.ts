/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import config from '../../../config'
import { ApiResponse } from '../../../shared/apiResponse'
import { TryCatchHandler } from '../../../shared/tryCatchHandler'
import { IUser } from '../user/user.interface'
import {
  ILogoutResponse,
  IRefreshTokenResponse,
} from './user.auth.interface'
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

const refreshToken: RequestHandler = TryCatchHandler(async (req, res) => {
  const { refreshToken } = req.cookies
  if (!refreshToken) {
    ApiResponse<null>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Unauthorized',
      data: null,
    })
  }
  const result = await authService.refreshTokenGenerator(refreshToken)

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
    sameSite: 'none' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  ApiResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: result,
  })
})

// Update Password
const changePassword: RequestHandler = TryCatchHandler(async (req, res) => {
  const password = req.body

  const payload = req?.user

  await authService.changePassword(password, payload)
  ApiResponse<null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully!',
    data: null,
  })
})

// Logout user

const logoutUser: RequestHandler = TryCatchHandler(async (req, res) => {
  const refreshToken = await req.cookies.refreshToken
  const result = await authService.logout(refreshToken)

   const cookieOptions = {
     secure: config.env === 'production',
     httpOnly: true,
     sameSite: 'none' as const,
     maxAge: 0, // Immediately expire the cookie
   }

   if (result) {
     res.clearCookie('refreshToken', cookieOptions)
   }
  ApiResponse<ILogoutResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logout Successfully!',
    data: result,
  })
})

// reset password

const resetPassword: RequestHandler = TryCatchHandler(async (req, res) => {
  const { email } = req.body

  await authService.resetPassword(email)
  ApiResponse<null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully!',
    data: null,
  })
})

// update password from the server

const updatePassword: RequestHandler = TryCatchHandler(async (req, res) => {
  const { password } = req.body
  const { token } = req.params
  await authService.updatePassword(token, password)
  ApiResponse<null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully!',
    data: null,
  })
})

export const authController = {
  loginUser,
  refreshToken,
  changePassword,
  logoutUser,
  resetPassword,
  updatePassword,
}
