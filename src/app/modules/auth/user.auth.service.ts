/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status'
import {  Secret } from 'jsonwebtoken'
import ApiError from '../../../Errors/apiError'
import config from '../../../config'
import { jwtHelper } from '../../../helpers/jwtHelper'
import { UserModel } from '../user/user.model'
import {
  ILogin,
  ILoginResponse,

} from './user.auth.interface'

const loginService = async (payload: ILogin): Promise<ILoginResponse> => {
  const { email, password } = payload
  const isUserExist = await UserModel.findOne({ email: email })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user Not Found!')
  }

  if (
    isUserExist.password &&
    !(await UserModel.isPasswordMatch(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password incorrect!')
  }

  const { name, email: userEmail, _id, role } = isUserExist

  const accessToken = await jwtHelper.createToken(
    { userEmail, name, _id, role },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string,
  )

  const refreshToken = await jwtHelper.createToken(
    { userEmail, name, _id, role },
    config.jwt.refreshSecret as Secret, 
    config.jwt.refreshExpiresIn as string,
  )

  return {
    ...isUserExist.toObject(),
    refreshToken,
    accessToken: accessToken,
  }
}


export const authService = {
  loginService
}
