import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const NavbarLeft = () => {
  return (
    <div className='flex gap-4 h-5 items-center'>
      <Link
        href='#spaces'
        className='text-muted-foreground hover:text-foreground'
      >
        Explore
      </Link>
      <Separator orientation='vertical' />
      <Link
        href='/booking'
        className='text-muted-foreground hover:text-foreground'
      >
        Booking
      </Link>
    </div>
  )
}

export default NavbarLeft
