import { z } from 'zod'


export const UserValidationSchema = z.object({
  body: z.object({
   name: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'admin']),
  password: z.string().min(6), // Assuming a minimum password length of 8
  phone: z.string(),
  address: z.string(),
  }),
})


export const UserUpdateValidationSchema = z.object({
  body: z
    .object({
       name: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'admin']),
  password: z.string().min(6), // Assuming a minimum password length of 8
  phone: z.string(),
  address: z.string(),
    })
    .partial(),
})
