import { Pagination } from './interface'
import { Space } from './space.interface'

export interface Event {
  _id: string
  name: string
  space: {
    _id: string
    name: string
  }
  description: string
  host: string
  attendee: number
  capacity: number
  status: string
  startDate: string
  endDate: string
  image: string
}

export interface EventsPagination {
  events: Event[]
  pagination: Pagination
}
