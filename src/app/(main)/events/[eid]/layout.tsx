import { Metadata } from 'next'

import { BookingProvider } from '@/context/booking-context'
import { EditModalProvider } from '@/context/edited-status'

export const metadata: Metadata = {
  title: 'Event Details',
  description: 'View workspace information and make a reservation.',
}

export default function EventDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BookingProvider>
      <EditModalProvider>{children}</EditModalProvider>
    </BookingProvider>
  )
}
