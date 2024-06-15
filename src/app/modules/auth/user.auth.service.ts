/* eslint-disable @typescript-eslint/ban-ts-comment */
import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import { JwtPayload, Secret } from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import ApiError from '../../../Errors/apiError'
import config from '../../../config'
import { jwtHelper } from '../../../helpers/jwtHelper'
import { UserModel } from '../user/user.model'
import {
  IChangePassword,
  ILogin,
  ILoginResponse,
  ILogoutResponse,
  IRefreshTokenResponse,
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

// Generate Refresh Token using access token
const refreshTokenGenerator = async (
  token: string,
): Promise<IRefreshTokenResponse | null> => {
  let decoded: JwtPayload
  try {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    decoded = jwtHelper.verifyToken(token, config.jwt.refreshSecret as Secret)
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }
  const { userEmail: email } = decoded
  const user = await UserModel.findOne({ email: email })
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!')
  }

  const { email: userEmail, name, _id, role } = user

  const newAccessToken = jwtHelper.createToken(
    { userEmail, name, _id, role },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string,
  )

  return {
    accessToken: newAccessToken,
    ...user.toObject(),
  }
}

const changePassword = async (
  password: IChangePassword,
  payload: JwtPayload,
): Promise<void> => {
  // check user exist
  const isUserExist = await UserModel.isUserExist(payload.userEmail)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!')
  }

  // check password correct
  if (
    isUserExist.password &&
    !(await UserModel.isPasswordMatch(
      password.oldPassword,
      isUserExist?.password,
    ))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password does not match')
  }

  const hashPassword = await bcrypt.hash(
    password.newPassword,
    Number(config.bcryptSaltRound),
  )

  // update details
  const updateData = {
    password: hashPassword,
    updatePasswordDate: new Date(),
  }

  // update password
  await UserModel.findOneAndUpdate({ email: payload.userEmail }, updateData)
}

// logout user

const logout = async (token: string): Promise<ILogoutResponse> => {
  let decoded: JwtPayload
  try {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    decoded = jwtHelper.verifyToken(token, config.jwt.refreshSecret as Secret)
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }
  const { userEmail: email } = decoded
  const isUserExist = await UserModel.isUserExist(email)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!')
  }

  // delete refresh token
  const result = await UserModel.findOneAndUpdate(
    { email: email },
    { accessToken: '' },
  )
  // @ts-expect-error
  return result
}

// Reset password

const resetPassword = async (userEmail: string): Promise<void> => {
  // check user exist
  const isUserExist = await UserModel.isUserExist(userEmail)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!')
  }

  // Generate a unique token (random number)
  const token = Math.floor(100000 + Math.random() * 900000) // Generate a 6-digit random number

  // Save the token in the database along with the user's email
  const result = await UserModel.findOneAndUpdate(
    { email: userEmail },
    { resetPasswordToken: token },
  )
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something wrong!')
  }

  const transporter = nodemailer.createTransport({
    host: 'shubolikhe.blog@gmail.com',
    service: 'gmail',
    secure: false,
    auth: {
      user: 'shubolikhe.blog@gmail.com',
      pass: 'htws kseh sxwd elqg',
    },
  })
  const resetPasswordLink = `${config.frontEndUrl}/reset-password/${token}`

  const mailOptions = {
    from: 'your@example.com',
    to: userEmail,
    subject: 'Reset Your Password',
    text: `You are receiving this email because you (or someone else) has requested to reset the password for your account. Please click on the following link to reset your password: ${resetPasswordLink}`,
    html: `<p>You are receiving this email because you (or someone else) has requested to reset the password for your account. Please click on the following link to reset your password:</p><p><a href="${resetPasswordLink}">Reset Password</a></p>`,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to send reset password email',
    )
  }
}

// update new password
const updatePassword = async (
  token: string,
  newPassword: string,
): Promise<void> => {
  // Find the user by the reset password token
  const user = await UserModel.findOne({ resetPasswordToken: token })

  if (!user) {
    throw new ApiError(404, 'Invalid or expired reset password token')
  }

  // Hash the new password

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcryptSaltRound),
  )

  // Update the user's password and clear the reset password token
  const result = await UserModel.findOneAndUpdate(
    { resetPasswordToken: token },
    { password: hashedPassword, resetPasswordToken: null },
  )
  if (!result) {
    throw new ApiError(404, 'Something went wrong!')
  }
}

export const authService = {
  loginService,
  refreshTokenGenerator,
  changePassword,
  logout,
  resetPassword,
  updatePassword,
}
