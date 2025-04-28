'use client'
import { MouseEvent, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'


import { format } from 'date-fns'
import { CalendarIcon, Clock, Coffee } from 'lucide-react'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { useBooking } from '@/context/booking-context'
import { Event } from '@/interfaces/event.interface'
import { Space, TimeSlots } from '@/interfaces/space.interface'
import { cn } from '@/lib/utils'
import { createAttendance, getAttendanceById } from "@/repo/attendance"
import { createReservation } from '@/repo/reservations'
import { getTimeslots } from '@/repo/spaces'

const BookingEvent = ({ event }: { event: Event }) => {
  const router = useRouter()
  const { data: session } = useSession();
  const { selectedRoom, setSelectedRoom } = useBooking()

  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState('')
  const [timeslots, setTimeslots] = useState<TimeSlots[]>([])

  const [isJoin,setIsJoin] = useState<boolean | null>(null)

  async function join() {
    const result = await createAttendance(event._id, session?.accessToken!);
    if (result.success) {
      setIsJoin(true);
    }
  }

  async function checkAttendance() {
    const result = await getAttendanceById(session?.accessToken!);
    console.log(result)
    for (const item of result) {
      if (item.event._id == event._id) {
        return setIsJoin(true);
      }
      setIsJoin(false);
    }
  }isJoin

  useEffect(() => {
    checkAttendance();
  }, [])

  if (isJoin == null) {
    return null;
  }

  const fromDate = new Date()

  return (
    <Card id='booking-menu' className='sticky top-20 scroll-mt-20'>
      <CardHeader>
        <CardTitle className='text-xl'>Interested in the event?</CardTitle>
        <CardDescription className='text-md'>
          Come join the event now!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className='w-full'>
          <CardTitle className='text-md pb-3'>Current Attendees</CardTitle>
          <CardTitle className='text-[#33B373] text-lg/7 font-bold'>
            <div className='col-span-2 mb-2'>
              {`${event.attendee}/${event.capacity}`}
            </div>
          </CardTitle>

          <CardTitle className='text-md pb-3 '>Event Date</CardTitle>
          <CardTitle className='text-md pb-3 font-bold'>
            {`${format(new Date(event.startDate), 'PPP')} - ${format(new Date(event.endDate), 'PPP')}`}
          </CardTitle>

          <CardTitle className='mt-2'>Attending Fee</CardTitle>
          <div className='text-xl font-bold mt-3'>0฿</div>
        </div>
      </CardContent>
      <CardFooter>
        <div className='w-full flex gap-2 justify-end'>
          <Button
            variant='outline'
            className='cursor-pointer w-1/2 sm:w-1/4 lg:w-1/2'
          >
            Contact Event Manager
          </Button>
          <Button
            className='cursor-pointer w-1/2 sm:w-1/4 lg:w-1/2'
            disabled={isJoin}
            type='submit' onClick={() => {join()}}>
            Join
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default BookingEvent
