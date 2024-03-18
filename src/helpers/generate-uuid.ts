import type { UUID } from '@/types'

export const generateUuid = (): UUID => {
  const newUuid = crypto.randomUUID()

  return newUuid
}
