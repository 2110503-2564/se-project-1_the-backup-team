'use client'

import { createContext, useContext, useState } from 'react'

import { Room } from '@/interfaces/space.interface'

type BookingContextType = {
  selectedRoom: Room | undefined
  setSelectedRoom: (room: Room | undefined) => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined)
  return (
    <BookingContext.Provider value={{ selectedRoom, setSelectedRoom }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}

export default BookingProvider
