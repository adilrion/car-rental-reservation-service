/* eslint-disable no-console */
import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'

let server: Server

process.on('uncaughtException', error => {
  console.log('🔴 Uncaught exception is detected: ', error)
  process.exit(1)
})

async function main() {
  try {
    await mongoose.connect(config.mongoURI as string)
    server = app.listen(config.port, () => {
      console.log(`🟢 Example app listening on port ${config.port}`)
    })

    console.log('🟢 Database connected successfully')
  } catch (error) {
    console.log('🔴 Something wrong here', error)
    process.exit(1)
  }
}
function stopServer() {
  if (server) {
    server.close(() => {
      console.log('🔴 Server closed')
      process.exit(0)
    })
  }
}
process.on('unhandledRejection', error => {
  console.log('🔴 Unhandled rejection is detected: ', error)
  stopServer()
})

process.on('SIGTERM', () => {
  console.log('🔴 SIGTERM is detected. server closed..')
  stopServer()
})

main()
