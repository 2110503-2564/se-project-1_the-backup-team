import { Event, EventsPagination } from '@/interfaces/event.interface'

export const fetchEvents = (page: number = 1, limit: number = 6) => {
  return new Promise<EventsPagination>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/events?page=${page}&limit=${limit}`,
        { next: { revalidate: 300 } },
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
