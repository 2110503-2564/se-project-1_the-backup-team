import Link from 'next/link'

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

import AdminPanel from '@/components/admin-panel'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { AdminCursorProvider } from '@/context/admin-cursor'
import { authOptions } from '@/lib/auth-options'

const SpacesLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  return (
    <AdminCursorProvider>
      <div className='container-wrapper'>
        <div className='container py-6'>
          <section id='spaces' className='scroll-mt-20'>
            {children}
          </section>
        </div>
      </div>
      {session?.user.role == 'admin' && <AdminPanel />}
    </AdminCursorProvider>
  )
}

export default SpacesLayout
