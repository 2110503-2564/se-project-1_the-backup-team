'use client'
import { MouseEvent, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { format } from 'date-fns'
import { CalendarIcon, Clock, Eye, MoreHorizontal, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Event } from '@/interfaces/event.interface'
import { TimeSlots } from '@/interfaces/space.interface'
import { cn } from '@/lib/utils'
import { deleteEvent } from '@/repo/events'


const EventsActions = ({ event }: { event: Event }) => {

  //const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  const handleDelete = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    

    try {
      const response = await deleteEvent(
        event._id,
      )

      if (!response.success) {
        toast.error(response.message || 'Failed to delete this event')
        return
      }

      toast.success('Event deleted')
      router.refresh()
    } catch (e) {
      toast.error('Something went wrong!')
    }
  }

  const handleUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
    //todo...
  }

  return (
    
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='h-full'>
            <Button variant='ghost' size='icon'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>

            {/* {Add more here} */}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-red-600'
            onClick={handleDelete}
          >
            <X className='mr-2 h-4 w-4 text-red-600' />
            Delete Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
     
  )
}

export default EventsActions
