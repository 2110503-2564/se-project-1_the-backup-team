'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Event } from '@/interfaces/event.interface'
import { cn } from '@/lib/utils'
import { createAttendance, getAttendanceById } from '@/repo/attendance'
import { getEventById } from '@/repo/events'

const BookingEvent = ({ event }: { event: Event }) => {
  const router = useRouter()
  const { data: session } = useSession()

  const [isJoined, setIsJoined] = useState<boolean | undefined>(false)
  const [isFull, setIsFull] = useState<boolean | undefined>(false)
  const [isEnd, setIsEnd] = useState<boolean | undefined>(false)

  async function join() {
    if (!session || !session.accessToken) return
    const result = await createAttendance(event._id, session.accessToken)
    if (result.success) {
      setIsJoined(true)
    }
    toast.success('Joined! See you there!')
    router.refresh()
  }

  useEffect(() => {
    async function checkAttendance() {
      if (!session || !session.accessToken) return
      const result = await getAttendanceById(session.accessToken)
      for (const item of result) {
        if (item.event?._id == event._id) {
          setIsJoined(true)
          break
        }
      }
    }
    function checkEventEnd() {
      const today = new Date()
      const endDate = new Date(event.endDate)
      if (today > endDate) {
        setIsEnd(true)
      }
    }
    async function checkMaxCap() {
      // I think it's better if we requery, the delay tho..
      const result = await getEventById(event._id)
      if (result.attendee >= result.capacity) {
        setIsFull(true)
      }
    }
    checkAttendance()
    checkEventEnd()
    checkMaxCap()
  }, [event._id, event.endDate, session])

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
          <CardTitle
            className={cn(
              'flex items-center gap-1 text-lg/7 font-bold',
              event.attendee < event.capacity
                ? 'text-green-700'
                : 'text-red-700',
            )}
          >
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
            disabled={isFull || isJoined || isEnd || !session?.accessToken}
            type='submit'
            onClick={() => {
              join()
            }}
          >
            {isEnd
              ? 'Event Ended'
              : isJoined
                ? 'Joined'
                : isFull
                  ? 'Event Full'
                  : session?.accessToken
                    ? 'Join'
                    : 'Sign In To Join'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default BookingEvent
