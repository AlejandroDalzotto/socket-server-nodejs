import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const dbUser = process.env.DB_USER ?? 'test'
const dbPassword = process.env.DB_PASSWORD

// Basic configuration of the database.
const database = new Sequelize('socketdb', dbUser, dbPassword, {
  // host: 'dpg-cj1hk695rnuhn3kc7m3g-a', // Production
  host: 'localhost', // Development
  dialect: 'postgres',
  port: 5432,
  logging: false
})

export default database
