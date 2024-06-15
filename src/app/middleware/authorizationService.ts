import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../Errors/apiError'
import config from '../../config'
import { jwtHelper } from '../../helpers/jwtHelper'

const AuthorizationPermission =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        (req.headers.authorization as string) ||
        (req.headers.Authorization as string)
      if (!token)
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You Are not Authorized!')

      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const [bearer, tokenValue] = token.split(' ')
      let verifiedUser
      // eslint-disable-next-line prefer-const
      verifiedUser = await jwtHelper.verifyToken(
        tokenValue,
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

export default AuthorizationPermission
