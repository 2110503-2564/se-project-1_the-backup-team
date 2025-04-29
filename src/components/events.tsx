import { Suspense } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { format } from 'date-fns'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { Event } from '@/interfaces/event.interface'
import { cn } from '@/lib/utils'

import EventsActions from './Event-actions'
import JoinEvents from './joined-events'

const EventCard = ({ event }: { event: Event }) => {
  return (
    <Card className='w-full rounded-lg overflow-hidden shadow-md pt-0 min-h-[25rem] md:min-h-[30rem]'>
      <div className='relative bg-muted block'>
        <AspectRatio ratio={16 / 9}>
          <Suspense fallback={<div className='bg-black size-full'></div>}>
            <Image
              src={`/events${event.image}`}
              alt='Card Image'
              fill
              loading='eager'
              className='rounded-t-md object-cover'
            />
          </Suspense>
        </AspectRatio>
      </div>

      <CardContent className='pt-1'>
        <div className='space-y-1'>
          <div className='flex justify-between items-center'>
            <CardTitle className='text-xl font-bold truncate'>
              {event.name}
            </CardTitle>
            <div className={cn('flex items-center gap-1 text-sm')}>
              <div className='text-black'>
                <EventsActions event={event}></EventsActions>
              </div>
            </div>
          </div>
          <CardDescription className='flex gap-1 items-center text-muted-foreground'>
            <MapPin className='h-4 w-4' />
            <div className='truncate'>{event.space.name}</div>
          </CardDescription>
        </div>
      </CardContent>

      <CardFooter className='mt-auto flex flex-col items-start'>
        <div className='flex-col w-full justify-between items-start'>
          <div className='flex items-center gap-1 text-sm'>
            <Calendar className='h-4 w-4' />
            <span>{format(event.startDate, 'MMM d')} start</span>
          </div>

          <div className='flex items-center justify-between gap-1 text-sm'>
            <div className='flex gap-1'>
              <Calendar className='h-4 w-4' />
              <span>{format(event.endDate, 'MMM d')} end</span>
            </div>

            <div
              className={cn(
                'flex flex-row gap-2 items-cen bottom-0 right-0',
                event.attendee < event.capacity
                  ? 'text-green-700'
                  : 'text-red-700',
              )}
            >
              <Users className='h-4 w-4' />
              <span>
                {event.attendee} / {event.capacity}
              </span>
            </div>
          </div>
        </div>

        <Button variant='outline' className='w-full mt-2 p-0'>
          <Link href={`/events/${event._id}`} className='w-full'>
            view Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

const EventsView = async ({ events }: { events: Event[] }) => {
  return (
    <>
      <JoinEvents />
      <p className='text-xl sm:text-md font-semibold'>Other Events</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:grid-rows-2'>
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </>
  )
}

export default EventsView
