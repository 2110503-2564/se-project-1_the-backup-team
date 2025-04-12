'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Icons } from './icons'

const MainNav = () => {
  const pathname = usePathname()

  return (
    <div className='mr-4 flex'>
      <Link href='/' className='mr-4 flex items-center gap-4 lg:mr-6'>
        <Icons.logo className='h-6 w-6' />
        <span className='hidden font-bold lg:inline-block'>Spaceflow</span>
      </Link>
      <nav className='flex items-center gap-4 text-sm xl:gap-6'>
        <Link
          href='/#featured'
          className='transition-colors hover:text-foreground/80'
        >
          Featured
        </Link>
        <Link
          href='/spaces'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/spaces' ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          Spaces
        </Link>
        <Link
          href='/reservations'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/reservations'
              ? 'text-foreground'
              : 'text-foreground/80',
          )}
        >
          My Reservations
        </Link>
      </nav>
    </div>
  )
}

export default MainNav
