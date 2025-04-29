import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

import AdminPanel from '@/components/admin-panel'
import { AdminCursorProvider } from '@/context/admin-cursor'
import { BookingProvider } from '@/context/booking-context'
import { EditModalProvider } from '@/context/edited-status'
import { authOptions } from '@/lib/auth-options'

export const metadata: Metadata = {
  title: 'Event Details',
  description: 'View workspace information and make a reservation.',
}

export default async function EventDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await getServerSession(authOptions)
  return (
    <AdminCursorProvider>
      <BookingProvider>
        <EditModalProvider>{children}</EditModalProvider>
      </BookingProvider>

      {/* {session?.user.role == 'admin' && <AdminPanel />} */}
    </AdminCursorProvider>
  )
}
