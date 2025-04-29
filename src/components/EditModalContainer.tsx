'use client'

import { useEditEventModal } from '@/context/event-status' 
import AddEventEditForm from './edit-event-form'
import { Space } from '@/interfaces/space.interface'

const EditModalContainer = ({ spaces }: { spaces: Space[] }) => {
  const { isEventModalOpen, editingEvent, closeEventModal } = useEditEventModal()

  if (!isEventModalOpen || !editingEvent) return null

  return (
    <AddEventEditForm
      event={editingEvent}
      spaces={spaces}
    />
  )
}

export default EditModalContainer;