'use client'

import { createContext, useContext, useState } from 'react'

type AdminCursor = 'normal' | 'add' | 'edit' | 'delete'

type AdminContextType = {
  cursor: AdminCursor
  setCursor: (cursor: AdminCursor) => void
}

const AdminCursorContext = createContext<AdminContextType | undefined>(
  undefined,
)

export const AdminCursorProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [cursor, setCursor] = useState<AdminCursor>('normal')
  return (
    <AdminCursorContext.Provider value={{ cursor, setCursor }}>
      {children}
    </AdminCursorContext.Provider>
  )
}

export const useCursor = () => {
  const context = useContext(AdminCursorContext)
  if (context === undefined) {
    throw new Error('useCursor must be used within a AdminCursorProvider')
  }
  return context
}
