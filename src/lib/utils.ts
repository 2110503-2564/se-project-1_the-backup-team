import { Reservation } from '@/interfaces/reservation.interface'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sortReservationsByDate(reservations: Reservation[]) {
  return [...reservations].sort((a, b) => {
    const dateA = new Date(a.reservationDate)
    const dateB = new Date(b.reservationDate)
    return dateA.getTime() - dateB.getTime()
  })
}
