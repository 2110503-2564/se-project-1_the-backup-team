import { Pagination } from './interface'
import { Space } from './space.interface'

export interface Event {
  name: string
  space: string
  description: string
  host: string
  capacity: number
  status: string
  startDate: string
  endDate: string
  image: string
  attendee: number
}

export interface EventsPagination {
  event: Event[]
  pagination: Pagination
}
