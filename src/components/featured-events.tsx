import { Suspense } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { format } from 'date-fns'
import { Calendar, ChevronRight, Clock, MapPin, Users } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { fetchEvents } from '@/repo/events'

const FeaturedEvents = async () => {
  try {
    const events = (await fetchEvents(0, 6)).events

    if (events.length === 0) throw new Error('No featured events')

    return (
      <div id='featured-events' className='scroll-mt-14'>
        <div className='flex flex-col items-center py-12'>
          <div className='w-full'>
            <div className='flex relative items-center justify-between gap-4 mb-4 ml-2 w-auto'>
              <h2 className='text-2xl sm:text-3xl font-semibold'>
                Featured Events
              </h2>
              <Button size='sm'>
                <Link href='/events' className='flex items-center gap-1'>
                  All Events
                  <ChevronRight className='size-4' />
                </Link>
              </Button>
            </div>
            <div className='relative w-full rounded-md border inset-shadow-sm'>
              <div className='relative flex gap-4 overflow-y-scroll p-6'>
                {events.map((event) => (
                  <Link
                    key={event._id}
                    href={`/events/${event._id}`}
                    className='relative group'
                  >
                    {event.attendee < event.capacity &&
                      event.attendee / event.capacity >= 0.75 && (
                        <div className='absolute inset-0 blur-sm bg-gradient-to-r from-pink-500 to-cyan-500 rounded-sm opacity-70 group-hover:opacity-90 transition duration-300 group-hover:duration-100 animate-gradient-x'></div>
                      )}
                    <Card
                      key={event._id}
                      className='relative border-none w-[375px] rounded-lg overflow-hidden pt-0 min-h-[24rem]'
                    >
                      <div className='relative bg-muted block'>
                        <AspectRatio ratio={16 / 9}>
                          <Suspense
                            fallback={
                              <div className='bg-black size-full'></div>
                            }
                          >
                            <Image
                              key={event._id}
                              src={'/spaces/placehold.jpg'}
                              alt='Card Image'
                              fill
                              sizes='100'
                              loading='lazy'
                              className='rounded-t-md object-cover'
                            />
                          </Suspense>
                        </AspectRatio>
                      </div>
                      <CardContent className='space-y-4'>
                        <div className='space-y-1'>
                          <CardTitle className='text-xl font-bold'>
                            <div className='flex gap-2 items-center w-full'>
                              <p className='truncate'>{event.name}</p>
                            </div>
                          </CardTitle>
                          <CardDescription className='flex gap-1 items-center text-muted-foreground'>
                            <MapPin className='size-4' />
                            {event.space.name}
                          </CardDescription>
                        </div>
                      </CardContent>
                      <CardFooter className='mt-auto'>
                        <div className='flex flex-col justify-between items-start w-full space-y-4'>
                          <div className='flex w-full items-end justify-between'>
                            <div
                              className={cn(
                                'text-sm flex gap-1 items-center',
                                event.attendee < event.capacity
                                  ? 'text-green-700'
                                  : 'text-red-700',
                              )}
                            >
                              <Users className='size-4' />
                              {event.attendee} / {event.capacity}
                            </div>

                            <div className='flex flex-col gap-1 items-start text-gray-500 text-sm'>
                              <div className='flex gap-1 items-center'>
                                <Calendar className='size-4' />
                                {format(event.startDate, 'dd.MM.yy')}
                              </div>
                              <div className='flex gap-1 items-center justify-between'>
                                <Clock className='size-4' />
                                {format(event.startDate, 'HH:mm')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (_) {
    return <></>
  }
}

export default FeaturedEvents
