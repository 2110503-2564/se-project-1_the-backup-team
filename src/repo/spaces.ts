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
