import AppServer from '@/models/app-server'
import dotenv from 'dotenv'

dotenv.config()

const server = new AppServer()

server.listen()
