import express from 'express'
import { userAuthRouter } from '../modules/auth/user.auth.route'
import { userRouter } from '../modules/user/user.route'
import { carRouter } from '../modules/car/car.router'

const router = express.Router()

const allRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/auth',
    route: userAuthRouter,
  }, {
    path: '/cars',
    route: carRouter,
  }
]

allRoutes.forEach(route => router.use(route?.path, route?.route))
export default router
