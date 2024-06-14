import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../Errors/apiError'
import config from '../../config'
import { jwtHelper } from '../../helpers/jwtHelper'

const adminAuthorizationMiddleware =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        (req.headers.authorization as string) ||
        (req.headers.Authorization as string)
      if (!token)
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You Are not Authorized!')
      let verifiedUser
      // eslint-disable-next-line prefer-const
      verifiedUser = await jwtHelper.verifyToken(
        token,
        config.jwt.secret as Secret,
      )

      if (!verifiedUser) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not verified!')
      }

      req.user = verifiedUser

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are unauthorized!')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default adminAuthorizationMiddleware
