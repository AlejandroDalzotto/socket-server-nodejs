import type { Request, Response } from 'express'
import { User } from '@/models'
import { encryptPassword, generateUuid } from '@/helpers'

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Gets properties from the request body
    const { username, email, password } = req.body

    // Find an user by his email and with active true (Active false means that the user account was disabled).
    const existByEmail = await User.findOne({
      where: {
        email,
        active: true
      }
    })

    // If a user exists, that means the email is already registered in the database and you can't create others like it.
    if (existByEmail !== null) {
      throw new Error('This email is already registered')
    }

    // encrypt password to save it.
    const passwordEncrypted = encryptPassword(password)

    // Generate new uuid.
    const newUuid = generateUuid()

    // Save user to database with encrypted password and empty initial icon array.
    const user = await User.create({ uuid: newUuid, username, email, password: passwordEncrypted, active: true })

    res.status(201).json({
      status: 201,
      success: true,
      user: {
        username: user.get('username')
      }
    })
  } catch (e: any) {
    res.status(400).json({
      message: e.message
    })
  }
}

export const login = async (_req: Request, _res: Response): Promise<void> => {

}
