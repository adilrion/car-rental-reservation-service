/* eslint-disable no-unused-vars */
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { ApiNotFoundError } from './app/middleware/apiNotFoundError'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import router from './app/routes'

const app: Application = express()





app.use(cors())
app.use(cookieParser())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application configuration routes
app.use('/api/',router)

// Testing and welcome route for testing purposes
app.get('/', (req: Request, res: Response) => {
  res.send(`Hello World!`)
})

// Global Error Handler
app.use(globalErrorHandler)
app.use(ApiNotFoundError)

export default app 
