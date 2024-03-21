/* eslint-disable @typescript-eslint/no-misused-promises */
import { login, register, update } from '@/controllers'
import { Router } from 'express'

export const authRouter = Router()

authRouter.post('/login', login)

authRouter.post('/register', register)

authRouter.put('/update-user/:username', update)

authRouter.post('/verify-account', () => {})
