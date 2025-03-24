import { Reservation } from '@/interfaces/reservation.interface'

export interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface SpacesPageProps {
  searchParams?: {
    page?: string
  }
}

export interface MainNavItem {
  title: string
  href: string
}

export interface CommandsConfig {
  mainNav: MainNavItem[]
}

export interface ReservationsClientProps {
  initialReservations: Reservation[]
  initialSort: string
}
