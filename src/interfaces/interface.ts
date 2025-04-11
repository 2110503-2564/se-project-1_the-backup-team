import { Reservation } from '@/interfaces/reservation.interface'
import { Session } from 'next-auth'

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

export interface ReservationsPageParams {
  sort?: string
  layout?: string
  t?: string
}

export interface MainNavItem {
  title: string
  href: string
}

export interface CommandsConfig {
  mainNav: MainNavItem[]
}

export interface ReservationsClientProps {
  reservations: Reservation[]
  session: Session | null
}

export interface APIResponse<T> {
  success: boolean
  message?: string
  data: T
}
