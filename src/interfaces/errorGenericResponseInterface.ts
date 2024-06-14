import { IErrorInterface } from './errorInterface'

export type IErrorGenericResponseInterface = {
  statusCode: number
  message: string
  errorMessage: IErrorInterface[]
}
