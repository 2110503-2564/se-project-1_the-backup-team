import { Metadata } from 'next'

import { AdminCursorProvider } from '@/context/admin-cursor'
import { BookingProvider } from '@/context/booking-context'
import { EditModalProvider } from '@/context/edited-status'

export const metadata: Metadata = {
  title: 'Event Details',
  description: 'View workspace information and make a reservation.',
}

export default async function EventDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminCursorProvider>
      <BookingProvider>
        <EditModalProvider>{children}</EditModalProvider>
      </BookingProvider>
    </AdminCursorProvider>
  )
}
