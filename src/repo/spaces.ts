import { Space } from '@/interfaces/space.interface'
import spaces from './spaces.json'
import { Pagination } from '@/interfaces/interface'

/*  currently using mockup data
 *  TODO: Implement Backend API Usage
 */

export const fetchSpaces = () => {
  return new Promise<Space[]>((resolve) => {
    setTimeout(() => {
      resolve(spaces as Space[])
    }, 300)
  })
}

export const getSpaceById = (id: string) => {
  return new Promise<Space>((resolve, reject) => {
    setTimeout(() => {
      const space = spaces.find((space) => space._id === id)
      if (space) {
        resolve(space as Space)
      } else {
        reject(new Error(`Space with id ${id} not found`))
      }
    }, 300)
  })
}

export const fetchSpacesWithPagination = (
  page: number = 1,
  limit: number = 8,
) => {
  return new Promise<{
    spaces: Space[]
    pagination: Pagination
  }>((resolve) => {
    setTimeout(() => {
      const currentPage = Math.max(1, page)
      const itemsPerPage = Math.max(1, limit)

      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage

      const totalSpaces = spaces.length
      const totalPages = Math.ceil(totalSpaces / itemsPerPage)

      const paginatedSpaces = spaces.slice(startIndex, endIndex)

      resolve({
        spaces: paginatedSpaces as Space[],
        pagination: {
          total: totalSpaces,
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

export const searchSpaces = (
  query: string,
  page: number = 1,
  limit: number = 10,
) => {
  return new Promise<{
    spaces: Space[]
    pagination: Pagination
  }>((resolve) => {
    setTimeout(() => {
      const searchTerm = query.toLowerCase().trim()

      const filteredSpaces = spaces.filter(
        (space) =>
          space.name.toLowerCase().includes(searchTerm) ||
          space.district.toLowerCase().includes(searchTerm) ||
          space.province.toLowerCase().includes(searchTerm),
      )

      const currentPage = Math.max(1, page)
      const itemsPerPage = Math.max(1, limit)

      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage

      const totalSpaces = filteredSpaces.length
      const totalPages = Math.ceil(totalSpaces / itemsPerPage)

      const paginatedSpaces = filteredSpaces.slice(startIndex, endIndex)

      resolve({
        spaces: paginatedSpaces as Space[],
        pagination: {
          total: totalSpaces,
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

export const getReservableTime = (
  spaceId: string,
  roomId: string,
  date: string,
) => {
  return new Promise<{ time: string; available: boolean }[]>((resolve) => {
    setTimeout(() => {
      const space = spaces.find((space) => space._id === spaceId)

      if (!roomId) {
        resolve([])
        return
      }

      if (!date || date.trim() === '') {
        resolve([])
        return
      }

      if (!space) {
        resolve([])
        return
      }

      const room = space.rooms.find((room) => room._id === roomId)

      if (!room) {
        resolve([])
        return
      }

      const openHour = parseInt(space.opentime.substring(0, 2))
      const openMinute = parseInt(space.opentime.substring(2, 4))
      const closeHour = parseInt(space.closetime.substring(0, 2))
      const closeMinute = parseInt(space.closetime.substring(2, 4))

      const timeSlots = []

      let currentHour = openHour
      let currentMinute = openMinute

      while (
        currentHour < closeHour ||
        (currentHour === closeHour && currentMinute < closeMinute)
      ) {
        const time = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`

        const available = Math.random() > 0.3

        timeSlots.push({ time, available })

        currentHour += 1

        if (currentHour !== openHour) {
          currentMinute = 0
        }
      }

      resolve(timeSlots)
    }, 300)
  })
}
