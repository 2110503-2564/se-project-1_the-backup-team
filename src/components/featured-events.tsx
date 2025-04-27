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

interface events {
  _id: number
  name: string
  space: string
  host: string
  attendees: number
  capacity: number
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  image: string
}

const mockEvents: events[] = [
  {
    _id: 1,
    name: 'Plant workshop',
    space: 'WeWork T-One Building',
    host: 'Neo Anderson',
    attendees: 180,
    capacity: 200,
    startDate: new Date(Date.now() + 86400000).toISOString(),
    endDate: new Date(Date.now() + 86400000 + 10800000).toISOString(),
    createdAt: new Date(Date.now() - 86400000 - 10800000).toISOString(),
    updatedAt: new Date().toISOString(),
    image: '/test.jpg',
  },
  {
    _id: 2,
    name: 'Tech Startup Meetup',
    space: 'True Digital Park',
    host: 'Sarah Johnson',
    attendees: 150,
    capacity: 150,
    startDate: new Date(Date.now() + 86400000).toISOString(),
    endDate: new Date(Date.now() + 86400000 + 10800000).toISOString(),
    createdAt: new Date(Date.now() - 86400000 - 10800000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 - 10800000).toISOString(),
    image: '/tech-meetup.jpg',
  },
  {
    _id: 3,
    name: 'Design Thinking Workshop',
    space: 'JustCo Samyan',
    host: 'Michael Wong',
    attendees: 20,
    capacity: 75,
    startDate: new Date(Date.now() + 172800000).toISOString(),
    endDate: new Date(Date.now() + 172800000 + 14400000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: '/design-workshop.jpg',
  },
  {
    _id: 4,
    name: 'AI Conference',
    space: 'The Commons Thonglor',
    host: 'Emily Chen',
    attendees: 300,
    capacity: 300,
    startDate: new Date(Date.now() + 259200000).toISOString(),
    endDate: new Date(Date.now() + 259200000 + 28800000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: '/ai-conference.jpg',
  },
  {
    _id: 5,
    name: 'Networking for Entrepreneurs',
    space: 'Spaces Chamchuri Square',
    host: 'Robert Tan',
    attendees: 10,
    capacity: 100,
    startDate: new Date(Date.now() + 345600000).toISOString(),
    endDate: new Date(Date.now() + 345600000 + 7200000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: '/networking-event.jpg',
  },
  {
    _id: 6,
    name: 'Sustainable Business Forum',
    space: 'Garage Society Paya Thai',
    host: 'Lisa Martinez',
    attendees: 0,
    capacity: 120,
    startDate: new Date(Date.now() + 432000000).toISOString(),
    endDate: new Date(Date.now() + 432000000 + 18000000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: '/sustainability-forum.jpg',
  },
]

const fetchMockEvents = async (page: number = 0, limit: number = 6) => {
  return new Promise<events[]>(async (resolve, reject) => {
    try {
      const ev = mockEvents.slice(limit * page, limit * (page + 1))
      resolve(ev as events[])
    } catch (_) {
      reject()
    }
  })
}

const FeaturedEvents = async () => {
  try {
    const events = await fetchMockEvents(0, 6)

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
                    {event.attendees < event.capacity &&
                      event.attendees / event.capacity >= 0.75 && (
                        <div className='absolute inset-0 blur-sm bg-gradient-to-r from-pink-500 to-cyan-500 rounded-sm opacity-70 group-hover:opacity-90 transition duration-300 group-hover:duration-100 animate-gradient-x'></div>
                      )}
                    <Card
                      key={event._id}
                      className='relative border-none min-w-[375px] rounded-lg overflow-hidden pt-0 min-h-[24rem]'
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
                          <CardTitle className='text-xl font-bold truncate'>
                            <div className='flex gap-2 items-center'>
                              {event.name}
                              {new Date(event.updatedAt).toDateString() ===
                                new Date().toDateString() &&
                                event.attendees < event.capacity && (
                                  <span className='relative flex size-2'>
                                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75'></span>
                                    <span className='relative inline-flex size-2 rounded-full bg-emerald-500'></span>
                                  </span>
                                )}
                            </div>
                          </CardTitle>
                          <CardDescription className='flex gap-1 items-center text-muted-foreground'>
                            <MapPin className='size-4' />
                            {event.space}
                          </CardDescription>
                        </div>
                      </CardContent>
                      <CardFooter className='mt-auto'>
                        <div className='flex flex-col justify-between items-start w-full space-y-4'>
                          <div className='flex w-full items-end justify-between'>
                            <div
                              className={cn(
                                'text-sm flex gap-1 items-center',
                                event.attendees < event.capacity
                                  ? 'text-green-700'
                                  : 'text-red-700',
                              )}
                            >
                              <Users className='size-4' />
                              {event.attendees} / {event.capacity}
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
