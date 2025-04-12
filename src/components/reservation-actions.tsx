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
import { Reservation } from '@/interfaces/reservation.interface'
import { TimeSlots } from '@/interfaces/space.interface'
import { cn } from '@/lib/utils'
import { deleteReservation, updateReservation } from '@/repo/reservations'
import { getTimeslots } from '@/repo/spaces'

const ReservationActions = ({ reservation }: { reservation: Reservation }) => {
  const { data: session } = useSession()
  const [date, setDate] = useState<Date | undefined>(
    new Date(reservation.reservationDate),
  )
  const [time, setTime] = useState('')
  const [timeslots, setTimeslots] = useState<TimeSlots[]>([])
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (date && openModal) {
        const ts = await getTimeslots(
          reservation.space._id,
          reservation.room._id,
          date.toISOString(),
        )
        setTimeslots(ts)
      }
    }
    fetchTimeSlots()
    return () => {
      setTimeslots([])
      setTime('')
    }
  }, [date, openModal, reservation.space._id, reservation.room._id])

  const handleDelete = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!session?.accessToken) return

    try {
      const response = await deleteReservation(
        reservation._id,
        session.accessToken,
      )

      if (!response.success) {
        toast.error(response.message || 'Failed to cancel reservation')
        return
      }

      toast.success('Reservation cancelled')
      router.refresh()
    } catch (e) {
      toast.error('Something went wrong!')
    }
  }

  const handleUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!session?.accessToken) return
    if (!date) return
    try {
      const response = await updateReservation(
        reservation._id,
        date,
        time,
        session.accessToken,
      )
      if (!response.success) {
        toast.error(response.message || 'Failed to cancel reservation')
      }
      toast.success('Reservation updated')
      setOpenModal(false)
      router.refresh()
    } catch (e) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='h-full'>
            <Button variant='ghost' size='icon'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <Link href={`/spaces/${reservation.space._id}`}>
            <DropdownMenuItem>
              <Eye className='mr-2 h-4 w-4' />
              View Space Details
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem asChild disabled={reservation.status !== 'active'}>
            <DialogTrigger className='w-full'>
              <>
                <CalendarIcon className='mr-2 h-4 w-4' />
                Reschedule
              </>
            </DialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-red-600'
            disabled={reservation.status !== 'active'}
            onClick={handleDelete}
          >
            <X className='mr-2 h-4 w-4 text-red-600' />
            Cancel Reservation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Reschedule</DialogTitle>
          <DialogDescription>Change reservation date & time</DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-2 gap-4 py-4'>
          <Popover>
            <PopoverTrigger asChild>
              <div className='w-full basis-1/2'>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal cursor-pointer',
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                fromDate={new Date()}
                selected={date}
                onSelect={setDate}
                initialFocus
                required
              />
            </PopoverContent>
          </Popover>

          <div>
            <Select value={time} onValueChange={setTime} required>
              <SelectTrigger
                className='col-span-3 w-full cursor-pointer'
                disabled={timeslots.length === 0}
              >
                <SelectValue
                  placeholder={
                    <div className='w-full flex items-center gap-2'>
                      <Clock />
                      Pick a time
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent className='max-h-60 overflow-y-auto'>
                {timeslots.map((t) => (
                  <SelectItem
                    key={t.time}
                    value={t.time}
                    disabled={!t.available}
                  >
                    {t.time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type='submit'
            onClick={handleUpdate}
            disabled={!date || !time}
            className='cursor-pointer'
          >
            Update reservation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReservationActions
