import express, { type Application } from 'express'
import cors from 'cors'
import database from '@/database/connection'

export default class AppServer {
  app: Application
  port: string
  paths: Record<string, string>

  constructor () {
    this.app = express()
    this.port = process.env.PORT ?? '3000'

    // Available routes in the application.
    this.paths = {
      user: '/api/users',
      auth: '/api/auth'
    }

    void this.database()
    this.middlewares()
    this.routes()
  }

  // Set up application routes.
  private routes (): void {

  }

  // Connection to database.
  private async database (): Promise<void> {
    try {
      await database.sync({ alter: true })
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }

  // Define middlewares for express.
  private middlewares (): void {
    this.app.use(express.json())
    this.app.use(cors({ origin: 'http://localhost:3000' }))
  }

  // Start method.
  listen (): void {
    this.app.listen(this.port, () => {
      console.log('App running on port %d', this.port)
    })
  }
}
