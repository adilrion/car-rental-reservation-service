/* eslint-disable @typescript-eslint/consistent-type-definitions */

export type ApiResponseType<T> = {
  statusCode: number
  success: boolean
  message?: string
  data?: T | null
  token?: string
}
