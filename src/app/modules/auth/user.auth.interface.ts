import { IUser } from "../user/user.interface"

export type ILogin = {
  email: string
  password: string
}

export type ILoginResponse = {
  accessToken: string
  refreshToken?: string
} & Partial<IUser>



