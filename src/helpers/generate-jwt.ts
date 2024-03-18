import jwt from 'jsonwebtoken'
import { User } from '@/models'
import type { UUID } from '@/types'

export const generateJWT = async (uuid: UUID): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { uuid }
    const secret = process.env.SECRET_KEY as string
    jwt.sign(payload, secret, {
      expiresIn: '1d',
      algorithm: 'HS384'
    }, (error, token) => {
      if (error !== null) {
        return reject(error.message)
      }

      return resolve(token ?? '')
    })
  })
}

export const checkJWT = async (token = ''): Promise<any> => {
  try {
    if (token === null || token === undefined) {
      throw new Error('401: Unauthorized or missing token')
    }
    const { uuid } = jwt.verify(token, process.env.SECRET_KEY as string) as { uuid: UUID }
    const user = await User.findOne({
      where: {
        uuid,
        active: true
      }
    })

    if (user === null || user === undefined) {
      throw new Error('401: Unauthorized or missing token')
    }

    return user
  } catch (error) {
    return undefined
  }
}
