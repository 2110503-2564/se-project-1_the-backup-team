'use client'

import { useEditEventModal } from '@/context/event-status'

import AddEventEditForm from './edit-event-form'

const EditModalContainer = () => {
  const { isEventModalOpen, editingEvent, closeEventModal } =
    useEditEventModal()

  if (!isEventModalOpen || !editingEvent) return null

  return <AddEventEditForm event={editingEvent} />
}

export default EditModalContainer
