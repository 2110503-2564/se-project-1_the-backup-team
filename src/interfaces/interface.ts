import { LucideIcon } from 'lucide-react'
import { Session } from 'next-auth'

import { Reservation } from '@/interfaces/reservation.interface'

export interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface SpacesPageParams {
  page?: string
}

export interface ReservationsPageParams {
  sort?: string
  layout?: string
  t?: string
}

export interface MainNavItem {
  title: string
  href: string
  icon: LucideIcon
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
