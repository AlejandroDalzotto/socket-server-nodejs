import jwt from 'jsonwebtoken'
import { User } from '@/models'

export const generateJWT = async (uid: any): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { uid }
    const secret = process.env.SECRET_KEY as string
    jwt.sign(payload, secret, {
      expiresIn: '1d'
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
    const { uid } = jwt.verify(token, process.env.SECRET_KEY as string) as { uid: string }
    const user = await User.findOne({
      where: {
        id: uid,
        state: true
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
