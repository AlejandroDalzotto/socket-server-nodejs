// import { register } from '@/controllers'
import { register } from '@/controllers'
import { Router } from 'express'

export const authRouter = Router()

authRouter.get('/register', register)
