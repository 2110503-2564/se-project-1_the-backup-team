import { Event } from './event.interface'

export interface Attendance {
  _id: string
  event: Event
  user: string
}

export interface AttendanceResponse {
  createAt: string
  _id: string
  event: string
  user: string
}
