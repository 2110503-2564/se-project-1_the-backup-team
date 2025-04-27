import { Event } from './event.interface'

export interface Attendance {
  _id: string
  event: Event
  user: string
}
