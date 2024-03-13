import dotenv from 'dotenv'
import { AppServer } from './models'

dotenv.config()

const server = new AppServer()

server.listen()
