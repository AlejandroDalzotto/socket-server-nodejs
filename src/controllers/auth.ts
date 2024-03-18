import type { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import { User } from '@/models'
import { encryptPassword, generateJWT, generateUuid } from '@/helpers'
import { ApiResponse } from '@/payloads/api-response'

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
  } catch (e) {
    res.status(400).json({
      msg: (e as Error).message
    })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    // User is registered in database.
    const user = await User.findOne({
      where: {
        email,
        active: true
      }
    })

    if (user === null) {
      const apiResponse: ApiResponse<null> = {
        data: null,
        message: 'User doesn\'t exists in database',
        status: 404,
        success: false
      }

      res.status(404).json(apiResponse)
      return
    }

    // Verify password
    const userPassword = user.get('password')
    const isValidPassword = bcryptjs.compareSync(password, userPassword)
    if (!isValidPassword) {
      const apiResponse: ApiResponse<null> = {
        data: null,
        message: 'Email or password field is incorrect or missing',
        status: 400,
        success: false
      }

      res.status(400).json(apiResponse)
      return
    }

    // Generate JWT
    const token = await generateJWT(user.get('uuid'))

    // TODO: clear private user information.

    const apiResponse: ApiResponse<{ user: any, token: string }> = {
      data: {
        token,
        user
      },
      message: 'Valid credencials. Welcome sir!',
      status: 200,
      success: true
    }

    res.json(apiResponse)
  } catch (e) {
    const apiResponse: ApiResponse<null> = {
      data: null,
      message: '500: Internal server error',
      status: 500,
      success: false
    }

    res.status(500).json(apiResponse)
  }
}
