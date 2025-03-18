import Link from 'next/link'
import Image from 'next/image'

import NavbarLeft from '@/components/navbar-left'
import NavbarRight from '@/components/navbar-user'

const Navbar = () => {
  return (
    <header className='sticky w-full'>
      <div className='mx-auto max-w-6xl'>
        <div className='flex gap-4 justify-between items-center h-16 px-12'>
          <div className='flex items-center gap-8'>
            <Link href='/'>
              <Image src='/logo.png' alt='logo' width='32' height='32' />
            </Link>
            <NavbarLeft />
          </div>
          <NavbarRight />
        </div>
      </div>
    </header>
  )
}

export default Navbar
