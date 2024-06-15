import { z } from "zod"

export const bookingValidation = z.object({
  body: z.object({
    carId: z.string(),
    date: z.string(),
    startTime: z.string(), 
  }),
})