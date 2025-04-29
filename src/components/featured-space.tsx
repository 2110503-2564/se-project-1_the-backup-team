import { Suspense } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { ChevronRight, Clock, MapPin } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { fetchSpaces } from '@/repo/spaces'

import { Button } from './ui/button'

const FeaturedSpaces = async () => {
  try {
    const { spaces } = await fetchSpaces(0, 6)
    if (spaces.length === 0) throw new Error('No featured spaces')

    return (
      <div id='featured-spaces' className='scroll-mt-14'>
        <div className='flex flex-col items-center py-12'>
          <div className='w-full'>
            <div className='flex relative items-center justify-between gap-4 mb-4 ml-2 w-auto'>
              <h2 className='text-2xl sm:text-3xl font-semibold'>
                Featured Spaces
              </h2>
              <Button size='sm'>
                <Link href='/spaces' className='flex items-center gap-1'>
                  All Spaces
                  <ChevronRight className='size-4' />
                </Link>
              </Button>
            </div>
            <div className='w-full rounded-md border inset-shadow-sm'>
              <div className='flex gap-4 overflow-y-scroll p-6'>
                {spaces.map((space) => (
                  <Link key={space._id} href={`/spaces/${space._id}`}>
                    <Card
                      key={space._id}
                      className='min-w-[375px] rounded-lg overflow-hidden pt-0 min-h-[24rem]'
                    >
                      <div className='relative bg-muted block'>
                        <AspectRatio ratio={16 / 9}>
                          <Suspense
                            fallback={
                              <div className='bg-black size-full'></div>
                            }
                          >
                            <Image
                              key={space._id}
                              src={`/spaces${space.image}`}
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
                            {space.name}
                          </CardTitle>
                          <CardDescription className='flex gap-1 items-center text-muted-foreground'>
                            <MapPin className='size-4' />
                            {`${space.address}, ${space.district}, ${space.province}`}
                          </CardDescription>
                        </div>
                      </CardContent>
                      <CardFooter className='mt-auto'>
                        <div className='flex flex-col justify-between items-start w-full space-y-4'>
                          <div className='flex w-full items-center justify-between'>
                            <div className='text-gray-500 text-sm flex gap-1 items-center'>
                              <Clock className='size-4' />
                              {`${space.opentime.slice(0, 2)}:${space.opentime.slice(2)} - ${space.closetime.slice(0, 2)}:${space.closetime.slice(2)}`}
                            </div>

                            <div className='text-gray-500 text-sm flex gap-1 items-center'>
                              {space.rooms.length}{' '}
                              {space.rooms.length > 1 ? 'rooms' : 'room'}{' '}
                              available
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

export default FeaturedSpaces
