// EditModalContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'

type EditEventModalContextType = {
  isEventModalOpen: boolean
  openEventModal: () => void
  closeEventModal: () => void
}

const EditEventModalContext = createContext<EditEventModalContextType | undefined>(
  undefined,
)

export const EditEventModalProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)

  const openEventModal = () => setIsEventModalOpen(true)
  const closeEventModal = () => setIsEventModalOpen(false)

  return (
    <EditEventModalContext.Provider value={{ isEventModalOpen, openEventModal, closeEventModal }}>
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