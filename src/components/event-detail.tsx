'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import { ArrowLeft, MapPin } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Event } from '@/interfaces/event.interface'
import { Space } from '@/interfaces/space.interface'

import BookingMenuSkeleton from './booking-menu-skeleton'

const EventDetailClient = ({
  event,
  space,
}: {
  event: Event
  space: Space
}) => {
  const BookingEvent = dynamic(() => import('@/components/booking-event'), {
    loading: () => <BookingMenuSkeleton />,
    ssr: false,
  })

  return (
    <section id='booking'>
      <Button variant='ghost' size='sm' asChild className='mb-6'>
        <Link href='/events'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to events
        </Link>
      </Button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={`/events${event.image}`}
              alt='Card Image'
              fill
              priority
              className='rounded-lg object-cover'
            />
          </AspectRatio>

          <div className='mt-6'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <div>
                <div className='flex gap-2 items-center'>
                  <h1 className='text-3xl font-bold'>{event.name}</h1>
                </div>
                <div className='flex items-center mt-2 text-muted-foreground'>
                  <MapPin className='h-4 w-4 mr-1' />
                  <span>{`${space.name} , ${space.address}`}</span>
                </div>
              </div>
            </div>
            <Separator className='my-6' />
            <div>{`${event.description}`}</div>
          </div>
        </div>

        <div id='booking-form'>
          <BookingEvent event={event} />
        </div>
      </div>
    </section>
  )
}

export default EventDetailClient
