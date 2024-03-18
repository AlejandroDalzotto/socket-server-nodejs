import type { HttpStatusCode } from '@/types'

export interface ApiResponse<T> {
  message: string
  data: T
  status: HttpStatusCode
  success: boolean
}
