'use client'
import { useMemo } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import {
  ArrowLeft,
  Clock,
  Coins,
  MapPin,
  Smartphone,
  Users,
} from 'lucide-react'
import { Star } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useBooking } from '@/context/booking-context'
import { useEditModal } from '@/context/edited-status'
import { Attendance } from '@/interfaces/attendance.interface'
import { Event } from '@/interfaces/event.interface'
import { Reservation } from '@/interfaces/reservation.interface'
import { Space } from '@/interfaces/space.interface'
import { getSpaceById } from '@/repo/spaces'

import BookingMenuSkeleton from './booking-menu-skeleton'
// import CreateReview from './create-review'
// import EditReview from './edit-review'
// import ReviewBox from './review-box'

const EventDetailClient = ({
  event,
  space,
}: {
  event: Event
  space: Space
}) => {
  //   const { setSelectedRoom } = useBooking()
  //   const { isEdit } = useEditModal()
  const { data: session } = useSession()

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
              src={`/events/${event.image}`}
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
