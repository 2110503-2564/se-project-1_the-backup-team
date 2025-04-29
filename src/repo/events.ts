import { Event, EventsPagination } from '@/interfaces/event.interface'
import { APIResponse } from '@/interfaces/interface'

export const fetchEvents = (page: number = 1, limit: number = 6) => {
  return new Promise<EventsPagination>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/events?page=${page}&limit=${limit}`,
        { next: { revalidate: 0 } },
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Fetch events failed')
      }

      const body = await response.json()
      resolve(body.data as EventsPagination)
    } catch (_) {
      reject()
    }
  })
}

export const getEventById = (id: string) => {
  return new Promise<Event>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/events/${id}`,
        {
          cache: 'no-store',
        },
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Fetch failed')
      }

      const body = await response.json()

      resolve(body.data as Event)
    } catch (error) {
      reject(error instanceof Error ? error : new Error('Update failed'))
    }
  })
}

export const createEvent = (
  eventData: {
    name: string
    space: string
    description: string
    host: string
    capacity: number
    startDate: string
    endDate: string
    image: string
  },
  token: string,
) => {
  return new Promise<APIResponse<null>>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
          cache: 'no-store',
        },
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create event')
      }

      resolve({ success: true, data: null })
    } catch (e) {
      reject(e instanceof Error ? e : new Error('Failed to create event'))
    }
  })
}

export const updateEvent = (
  id: string,
  event: Partial<Event>,
  token: string,
  // name: string,
  // image: string,
  // description: string,
  // space: {
  //   id: string,
  //   name: string
  // },
  // host: string,
  // capacity: number,
  // startDate: string,
  // endDate: string
) => {
  return new Promise<APIResponse<null>>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/events/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(event),
          cache: 'no-store',
        },
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to updated this Event')
      }

      resolve({ success: true, data: null })
    } catch (e) {
      reject(e instanceof Error ? e : new Error('Failed to updated this Event'))
    }
  })
}

export const deleteEvent = (id: string, token: string) => {
  return new Promise<APIResponse<null>>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/events/${id}`,
        {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        },
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete Event')
      }

      resolve({ success: true, data: null })
    } catch (e) {
      reject(e instanceof Error ? e : new Error('Failed to delete Event'))
    }
  })
}
