'use client'

import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  BadgeCheck,
  BookCopy,
  CircleUser,
  LogOut,
  MoreVertical,
} from 'lucide-react'
import UserTag from './user-tag'
import { MouseEvent, useState } from 'react'

const LoginMenu = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)

  const user = {
    logo: '/logo.png',
    username: 'sn0wvy',
    email: 'admin@spaceflow.me',
  }

  const handleLogin = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setLoggedIn(true)
  }
  const handleLogout = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setLoggedIn(false)
  }

  return (
    <div className='max-w-48 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-all duration-300'>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground'>
              <UserTag {...user} />
              <MoreVertical className='ml-auto size-4' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='min-w-56 rounded-lg'
            side='bottom'
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <UserTag {...user} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href='/account'>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <BookCopy />
                Bookings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div
          className='flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground'
          onClick={handleLogin}
        >
          <CircleUser className='h-5 w-5' />
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate text-sm'>Sign in</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginMenu
