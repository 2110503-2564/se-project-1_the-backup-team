'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Edit, MoreHorizontal, X } from 'lucide-react'

import { useSession } from 'next-auth/react'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import ConfirmBox from '@/components/ui/confirmbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEditEventModal } from '@/context/event-status'
import { Event } from '@/interfaces/event.interface'
import { deleteEvent } from '@/repo/events'

const EventsActions = ({ event }: { event: Event }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const { openEventModal } = useEditEventModal()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    try {
      const response = await deleteEvent(event._id, session?.accessToken || '')

      if (!response.success) {
        toast.error(response.message || 'Failed to delete this event')
        return
      }

      toast.success('Your event was successfully deleted')
      router.refresh()
    } catch (e) {
      toast.error('Something went wrong!')
    } finally {
      setShowConfirm(false)
    }
  }

  const handleUpdate = () => {
    openEventModal(event)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='h-full'>
            <Button variant='ghost' size='icon'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem className='text-black-600' onClick={handleUpdate}>
            <Edit className='mr-2 h-4 w-4 text-black-600' />
            Edit Event
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='text-red-600'
            onClick={() => {
              setShowConfirm(true)
            }}
          >
            <X className='mr-2 h-4 w-4 text-red-600' />
            Delete Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showConfirm && (
        <ConfirmBox
          question='Are you sure you want to delete this event?'
          confirmColor='bg-red-500'
          cancelColor='bg-gray-500'
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  )
}

export default EventsActions
