import bcryptjs from 'bcryptjs'

export const encryptPassword = (password: string): string => {
  const salt = bcryptjs.genSaltSync(14)
  const passwordEncrypted = bcryptjs.hashSync(password, salt)
  return passwordEncrypted
}
