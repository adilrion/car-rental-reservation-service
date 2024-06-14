import { IPaginationOptions } from "./IPaginationAndFiltering"

export type ApiResponseType<T> = {
  statusCode: number
  success: boolean
  message?: string
  meta?: IPaginationOptions
  data: T | null
}
