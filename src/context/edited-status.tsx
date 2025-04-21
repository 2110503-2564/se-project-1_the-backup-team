// EditModalContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'

type EditModalContextType = {
  isEdit: boolean
  openModal: () => void
  closeModal: () => void
}

const EditModalContext = createContext<EditModalContextType | undefined>(
  undefined,
)

export const EditModalProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isEdit, setIsEdit] = useState(false)

  const openModal = () => setIsEdit(true)
  const closeModal = () => setIsEdit(false)

  return (
    <EditModalContext.Provider value={{ isEdit, openModal, closeModal }}>
      {children}
    </EditModalContext.Provider>
  )
}

export const useEditModal = () => {
  const context = useContext(EditModalContext)
  if (!context)
    throw new Error('useEditModal must be used within EditModalProvider')
  return context
}

export default EditModalProvider
