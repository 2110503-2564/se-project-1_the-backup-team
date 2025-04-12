import { ReservationStatus } from '@/types/types'

import { Room } from './space.interface'

export interface Reservation {
  _id: string
  reservationDate: string
  status: ReservationStatus
  user: {
    name: string
    _id: string
  }
  room: Room
  space: {
    _id: string
    name: string
    tel: string
    image: string
  }
}

export interface ReservationResponse {
  reservationDate: string
  status: ReservationStatus
  user: string
  room: string
  space: string
  _id: string
  createdAt: string
  __v: number
}
