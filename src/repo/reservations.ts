import { Reservation } from '@/interfaces/reservation.interface'
import reservations from './reservations.json'
import { Pagination } from '@/interfaces/interface'
import { ReservationFilterParams } from '@/types/reservations-filter'

/*  currently using mockup data
 *  TODO: Implement Backend API Usage
 */

export const fetchReservations = () => {
  return new Promise<Reservation[]>((resolve) => {
    setTimeout(() => {
      resolve(reservations as Reservation[])
    }, 300)
  })
}

export const getReservationById = (id: string) => {
  return new Promise<Reservation>((resolve, reject) => {
    setTimeout(() => {
      const reservation = reservations.find(
        (reservation) => reservation._id === id,
      )
      if (reservation) {
        resolve(reservation as Reservation)
      } else {
        reject(new Error(`Reservation with id ${id} not found`))
      }
    }, 300)
  })
}

export const fetchReservationsByUser = (
  userId: string,
  filters: ReservationFilterParams = {},
) => {
  return new Promise<Reservation[]>((resolve) => {
    setTimeout(() => {
      const filtered = reservations.filter((res) => res.user === userId)

      if (filters.sort) {
        switch (filters.sort) {
          case 'date-desc':
            filtered.sort(
              (a, b) =>
                new Date(b.reservationDate).getTime() -
                new Date(a.reservationDate).getTime(),
            )
            break
          case 'date-asc':
            filtered.sort(
              (a, b) =>
                new Date(a.reservationDate).getTime() -
                new Date(b.reservationDate).getTime(),
            )
            break
          case 'price-desc':
            filtered.sort((a, b) => b.room.price - a.room.price)
            break
          case 'price-asc':
            filtered.sort((a, b) => a.room.price - b.room.price)
            break
        }
      }

      resolve(filtered as Reservation[])
    }, 300)
  })
}

export const fetchReservationsBySpace = (spaceId: string) => {
  return new Promise<Reservation[]>((resolve) => {
    setTimeout(() => {
      const spaceReservations = reservations.filter(
        (reservation) => reservation.space._id === spaceId,
      )
      resolve(spaceReservations as Reservation[])
    }, 300)
  })
}

export const fetchReservationsByRoom = (roomId: string) => {
  return new Promise<Reservation[]>((resolve) => {
    setTimeout(() => {
      const roomReservations = reservations.filter(
        (reservation) => reservation.room._id === roomId,
      )
      resolve(roomReservations as Reservation[])
    }, 300)
  })
}

export const fetchReservationsWithPagination = (
  page: number = 1,
  limit: number = 8,
) => {
  return new Promise<{
    reservations: Reservation[]
    pagination: Pagination
  }>((resolve) => {
    setTimeout(() => {
      const currentPage = Math.max(1, page)
      const itemsPerPage = Math.max(1, limit)

      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage

      const totalReservations = reservations.length
      const totalPages = Math.ceil(totalReservations / itemsPerPage)

      const paginatedReservations = reservations.slice(startIndex, endIndex)

      resolve({
        reservations: paginatedReservations as Reservation[],
        pagination: {
          total: totalReservations,
          page: currentPage,
          limit: itemsPerPage,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
        },
      })
    }, 300)
  })
}
