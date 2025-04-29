import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { Metadata } from 'next'
import { AdminCursorProvider } from '@/context/admin-cursor'
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const title = 'Ongoing Events'
const description = 'Discover current events and expand your knowledge. Browse our ongoing programs.'

export const metadata: Metadata = {
  title,
  description,
}

const EventsLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  return (
    <AdminCursorProvider>
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size='sm' className='rounded-md'>
            <Link href=''>
              <Plus className='size-4' />
              Host New Event
            </Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div className='container-wrapper'>
        <div className='container py-6'>
          <section id='events' className='scroll-mt-20'>
            {children}
          </section>
        </div>
      </div>
    </AdminCursorProvider>
  )
}

export default EventsLayout