import {
  Attendance,
  AttendanceResponse,
} from '@/interfaces/attendance.interface'
import { APIResponse } from '@/interfaces/interface'
import { NEXT_PUBLIC_API_ENDPOINT } from '@/lib/constant'
import { sortParams } from '@/types/types'

export const fetchAttendance = (
  token: string,
  sort: sortParams = 'date-desc',
) => {
  return new Promise<Attendance[]>(async (resolve, _) => {
    try {
      const queryParams = new URLSearchParams()
      queryParams.append('sort', sort)

      const response = await fetch(
        `${NEXT_PUBLIC_API_ENDPOINT}/api/v1/attendance?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error('Failed to fetch reservations')
      }

      const body = await response.json()

      resolve(body.data as Attendance[])
    } catch (e) {
      resolve([] as Attendance[])
    }
  })
}

export const deleteAttendance = (attendance: string, token: string) => {
  return new Promise<APIResponse<null>>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_ENDPOINT}/api/v1/attendance/${attendance}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to reserver')
      }

      const body = await response.json()
      resolve(body as APIResponse<null>)
    } catch (e) {
      reject(e instanceof Error ? e : 'Failed to reserve')
    }
  })
}

export const createAttendance = (event: string, token: string) => {
  return new Promise<APIResponse<AttendanceResponse>>(
    async (resolve, reject) => {
      try {
        const response = await fetch(
          `${NEXT_PUBLIC_API_ENDPOINT}/api/v1/events/attendance/${event}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
          },
        )

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Failed to attend')
        }

        const body = await response.json()
        resolve(body as APIResponse<AttendanceResponse>)
      } catch (e) {
        reject(e instanceof Error ? e : 'Failed to attend')
      }
    },
  )
}

export const getAttendanceById = (token: string) => {
  return new Promise<Attendance[]>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_ENDPOINT}/api/v1/events/attendance`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        },
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Fetch failed')
      }

      const body = await response.json()

      resolve(body.data as Attendance[])
    } catch (error) {
      reject(error instanceof Error ? error : new Error('Update failed'))
    }
  })
}
