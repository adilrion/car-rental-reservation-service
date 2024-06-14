import { z } from "zod";

export const idRequestValidation = z.object({
  params: z.object({
    id: z.string(),
  }),
})
