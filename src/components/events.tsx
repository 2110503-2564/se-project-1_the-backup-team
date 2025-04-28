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

const EventCard = ({ event }: { event: Event }) => {
  return (
    <Card className='w-full rounded-lg overflow-hidden shadow-md pt-0 min-h-[25rem] md:min-h-[30rem]'>
      <div className='relative bg-muted block'>
        <AspectRatio ratio={16 / 9}>
          <Suspense fallback={<div className='bg-black size-full'></div>}>
            <Image
              src={`/events/${event.image}`}
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
            <div className={cn(
              'flex items-center gap-1 text-sm',
              event.attendee < event.capacity ? 'text-green-700' : 'text-red-700'
            )}>
              <Users className='h-4 w-4' />
              <span>{event.attendee} / {event.capacity}</span>
            </div>
          </div>
          <CardDescription className='flex gap-1 items-center text-muted-foreground'>
            <MapPin className='h-4 w-4' />
            <div className='truncate'>{event.space.name}</div>
          </CardDescription>
        </div>
      </CardContent>
      
      <CardFooter className='mt-auto flex flex-col items-start'>
        <div className='flex w-full justify-between items-start'>
          <div className='flex items-center gap-1 text-sm'>
              <Calendar className='h-4 w-4' />
              <span>{format(event.startDate, 'MMM d')} start</span>
          </div>
        </div>

        <div className='flex w-full justify-between items-start mt-2'>
          <div className='flex items-center gap-1 text-sm'>
              <Calendar className='h-4 w-4' />
              <span>{format(event.endDate, 'MMM d')} end</span>
          </div>
        </div>
        
        <Button variant='outline' className='w-full mt-2'>
                <Link href={`/events/${event._id}`}>view Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

const EventsView = async ({ events }: { events: Event[] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:grid-rows-2'>
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  )
}

export default EventsView
