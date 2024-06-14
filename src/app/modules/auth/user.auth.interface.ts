import { IUser } from "../user/user.interface"

export type ILogin = {
  email: string
  password: string
}

export type ILoginResponse = {
  accessToken: string
  refreshToken?: string
  data: IUser
}


export type ILogoutResponse = {
  accessToken: string
  refreshToken?: string
}

export type IRefreshTokenResponse = {
  accessToken: string
  data: IUser
}




export type IChangePassword = {
  oldPassword: string
  newPassword: string
}
