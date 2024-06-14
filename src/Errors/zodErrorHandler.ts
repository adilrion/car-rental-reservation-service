import { ZodError, ZodIssue } from 'zod'
import { IErrorGenericResponseInterface } from '../interfaces/errorGenericResponseInterface'
import { IErrorInterface } from '../interfaces/errorInterface'

export const zodErrorHandler = (
  error: ZodError,
): IErrorGenericResponseInterface => {
  const result: IErrorInterface[] = error?.issues?.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1].toString(),
      message: issue?.message,
    }
  })

  return {
    statusCode: 400,
    message: 'Validation Error!',
    errorMessage: result,
  }
}
