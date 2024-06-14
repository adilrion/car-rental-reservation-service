import express from 'express'
import { userAuthRouter } from '../modules/auth/user.auth.route'
import { userRouter } from '../modules/user/user.route'

const router = express.Router()

const allRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/user-authentication',
    route: userAuthRouter,
  }
]

allRoutes.forEach(route => router.use(route?.path, route?.route))
export default router
