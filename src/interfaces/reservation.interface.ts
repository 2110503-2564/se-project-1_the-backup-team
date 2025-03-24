import { Room } from './space.interface'

export interface Reservation {
  _id: string
  reservationDate: string
  user: string
  room: Room
  space: {
    _id: string
    name: string
    tel: string
  }
}
