import Link from 'next/link'

import { Plus } from 'lucide-react'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { AdminCursorProvider } from '@/context/admin-cursor'
import { authOptions } from '@/lib/auth-options'
import CreateEventPopup from '@/components/create-event-popup'

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
          {/* แสดง CreateEventPopup เฉพาะเมื่อ role เป็น admin */}
          {session?.user.role === 'admin' && <CreateEventPopup />}
        </PageActions>
      </PageHeader>
      <div className="container-wrapper">
        <div className="container py-6">
          <section id="events" className="scroll-mt-20">
            {children}
          </section>
        </div>
      </div>
    </AdminCursorProvider>
  )
}

export default EventsLayout