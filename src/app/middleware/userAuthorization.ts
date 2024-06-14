import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../Errors/apiError'
import config from '../../config'
import { jwtHelper } from '../../helpers/jwtHelper'
import { UserModel } from '../modules/user/user.model'

const userAuthorizationMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
       const authHeader =
         (req.headers.authorization as string) ||
         (req.headers.Authorization as string)

       if (!authHeader) {
         throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
       }

       const tokenParts = authHeader?.split(' ')

       if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
         throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token format!')
       }

       const token = tokenParts[1]
      let verifiedUser
      // eslint-disable-next-line prefer-const
      verifiedUser = await jwtHelper.verifyToken(
        token,
        config.jwt.secret as Secret,
      )

      if (!verifiedUser) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not verified!')
      }

      // Check if the user exists
      const user = await UserModel.findOne({ email: verifiedUser.userEmail })
      
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
      }

    
      req.user = verifiedUser

      next()
    } catch (error) {
      next(error)
    }
  }

export default userAuthorizationMiddleware
