import type { Request, Response } from 'express'

export const register = async (req: Request, res: Response): Promise<void> => {
  console.log({ req, res })

  res.json({ message: 'hello sir' })
}

export const login = async (_req: Request, _res: Response): Promise<void> => {

}
