import {
  BookMarked,
  Box,
  Calendar,
  CircleUserRound,
  Home,
  Sparkles,
} from 'lucide-react'

import { CommandsConfig } from '@/interfaces/interface'

export const commandConfig: CommandsConfig = {
  mainNav: [
    {
      title: 'Home',
      href: '/',
      icon: Home,
    },
    {
      title: 'Featured',
      href: '/#featured',
      icon: Sparkles,
    },
    {
      title: 'Spaces',
      href: '/spaces',
      icon: Box,
    },
    {
      title: 'Events',
      href: '/events',
      icon: Calendar,
    },
    {
      title: 'Reservations',
      href: '/reservations',
      icon: BookMarked,
    },
    {
      title: 'Account',
      href: '/account',
      icon: CircleUserRound,
    },
  ],
}
