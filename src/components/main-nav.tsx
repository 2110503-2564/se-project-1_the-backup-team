'use client'
import Link from 'next/link'
import { Icons } from './icons'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

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
          href='/reserve'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/reserve' ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          Reserve
        </Link>
      </nav>
    </div>
  )
}

export default MainNav
