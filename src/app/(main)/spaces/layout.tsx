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

const title = 'Finding your spaces'
const description =
  'Browse professional workspaces, meeting rooms, and collaborative environments.'
export const metadata: Metadata = {
  title,
  description,
}

const SpacesLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  return (
    <AdminCursorProvider>
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size='sm' className='rounded-md'>
            <Link href='#spaces'>Start Browsing</Link>
          </Button>
          <Button asChild size='sm' variant='ghost' className='rounded-md'>
            <Link href='/reservations'>Your reservations</Link>
          </Button>
        </PageActions>
      </PageHeader>
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
