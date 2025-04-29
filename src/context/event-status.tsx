// EditModalContext.tsx
// EditEventModalContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'
import { Event } from '@/interfaces/event.interface'

type EditEventModalContextType = {
  isEventModalOpen: boolean
  editingEvent: Event | null
  openEventModal: (event: Event) => void
  closeEventModal: () => void
}

const EditEventModalContext = createContext<EditEventModalContextType | undefined>(undefined)

export const EditEventModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  const openEventModal = (event: Event) => {
    setEditingEvent(event)
    setIsEventModalOpen(true)
  }

  const closeEventModal = () => {
    setEditingEvent(null)
    setIsEventModalOpen(false)
  }

  return (
    <EditEventModalContext.Provider
      value={{
        isEventModalOpen,
        editingEvent,
        openEventModal,
        closeEventModal,
      }}
    >
      {children}
    </EditEventModalContext.Provider>
  )
}

export const useEditEventModal = () => {
  const context = useContext(EditEventModalContext)
  if (!context)
    throw new Error('useEditEventModal must be used within EditEventModalProvider')
  return context
}

export default EditEventModalProvider
