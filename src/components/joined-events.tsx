'use client'
import { Suspense, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { format } from 'date-fns'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { Attendance } from '@/interfaces/attendance.interface'
import { cn } from '@/lib/utils'
import { getAttendanceById } from '@/repo/attendance'

const JoinEvents = () => {
  const { data: session } = useSession();

  async function fetchEvents () {
    if (session?.accessToken) {
      const response = await getAttendanceById(session?.accessToken)
      setAttendances (response)
    }
  }

  const [attendances, setAttendances] = useState<Attendance[]>(); 

  useEffect(() => {
    fetchEvents()
  }, [])

  try {

    return (
      <div id='featured-events' className='scroll-mt-14'>
        <div className='flex flex-col items-center py-12'>
          <div className='w-full'>
            <div className='flex relative items-center justify-between gap-4 mb-4 ml-2 w-auto'>
              <p className='text-xl sm:text-md font-semibold'>
                Joined Events
              </p>
            </div>
            <div className='relative w-full rounded-md border inset-shadow-sm'>
              <div className='relative flex gap-4 p-6 overflow-y-scroll'>
                {
                  attendances!.length === 0 ? (
                    <>You haven&apos;t joined any events yet</>
                  ) : (
                    <>
                    {attendances!.map((attendance) => (
                      <Link
                        key={attendance.event._id}
                        href={`/events/${attendance.event._id}`}
                        className='relative group'
                      >
                        <Card
                          key={attendance.event._id}
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
                                  key={attendance.event._id}
                                  src={'/events/placehold.jpg'}
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
                                <div className='flex gap-2 items-center w-full max-w-[325px]'>
                                  <span className='truncate'>
                                    {attendance.event.name}
                                  </span>
                                </div>
                              </CardTitle>
                              <CardDescription className='flex gap-1 items-center text-muted-foreground'>
                                <MapPin className='size-4' />
                                {attendance.event.space.name}
                              </CardDescription>
                            </div>
                          </CardContent>
                          <CardFooter className='mt-auto'>
                            <div className='flex flex-col justify-between items-start w-full space-y-4'>
                              <div className='flex w-full items-end justify-between'>
                                <div
                                  className={cn(
                                    'text-sm flex gap-1 items-center',
                                    attendance.event.attendee < attendance.event.capacity
                                      ? 'text-green-700'
                                      : 'text-red-700',
                                  )}
                                >
                                  <Users className='size-4' />
                                  {attendance.event.attendee} / {attendance.event.capacity}
                                </div>
    
                                <div className='flex flex-col gap-1 items-start text-gray-500 text-sm'>
                                  <div className='flex gap-1 items-center'>
                                    <Calendar className='size-4' />
                                    {format(attendance.event.startDate, 'dd.MM.yy')}
                                  </div>
                                  <div className='flex gap-1 items-center justify-between'>
                                    <Clock className='size-4' />
                                    {format(attendance.event.startDate, 'HH:mm')}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                    </>
                  )
                }
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

export default JoinEvents
