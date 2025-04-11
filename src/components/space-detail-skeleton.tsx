import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import BookingMenuSkeleton from './booking-menu-skeleton'

const SpaceDetailSkeleton = () => {
  return (
    <section>
      <Button variant='ghost' size='sm' asChild className='mb-6'>
        <Link href='/spaces'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to spaces
        </Link>
      </Button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          {/* Main image skeleton */}
          <AspectRatio ratio={16 / 9}>
            <Skeleton className='h-full w-full rounded-lg' />
          </AspectRatio>

          <div className='mt-6'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <div className='space-y-2'>
                {/* Title skeleton */}
                <Skeleton className='h-9 w-64' />
                {/* Address skeleton */}
                <Skeleton className='h-5 w-80' />
              </div>
            </div>

            <Separator className='my-6' />

            {/* Tabs skeleton */}
            <div className='space-y-4'>
              <Skeleton className='h-10 w-48' />
              <div className='space-y-3'>
                <Skeleton className='h-6 w-32' />
                <Skeleton className='h-6 w-48' />
              </div>
            </div>
          </div>

          {/* Rooms section */}
          <div className='mt-10 space-y-6'>
            <Skeleton className='h-8 w-48' />
            <Separator className='my-6' />

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {/* Room card skeletons */}
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <Card
                    key={i}
                    className='w-full pt-0 rounded-lg overflow-hidden'
                  >
                    <AspectRatio ratio={16 / 9}>
                      <Skeleton className='h-full w-full' />
                    </AspectRatio>
                    <div className='p-6 space-y-4'>
                      <Skeleton className='h-6 w-24' />
                      <div className='flex gap-2'>
                        <Skeleton className='h-5 w-16 rounded-full' />
                        <Skeleton className='h-5 w-16 rounded-full' />
                      </div>
                      <div className='flex justify-between'>
                        <div className='flex gap-4'>
                          <Skeleton className='h-5 w-12' />
                          <Skeleton className='h-5 w-16' />
                        </div>
                        <Skeleton className='h-9 w-32' />
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>

        {/* Booking sidebar skeleton */}
        <BookingMenuSkeleton />
      </div>
    </section>
  )
}

export default SpaceDetailSkeleton
