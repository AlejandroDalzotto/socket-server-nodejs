/* eslint-disable @typescript-eslint/no-misused-promises */
import { register } from '@/controllers'
import { Router } from 'express'

export const authRouter = Router()

authRouter.post('/register', register)
