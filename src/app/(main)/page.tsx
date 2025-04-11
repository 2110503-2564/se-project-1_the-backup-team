import HomePage from '@/components/home'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import { fetchSpaces } from '@/repo/spaces'
import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

const Home = async () => {
  const spaces = await fetchSpaces()
  return (
    <main>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center w-full text-center bg-gray min-h-[80vh] bg-gray-50 border-b border-dashed'>
          <div className='text-4xl font-bold md:text-5xl'>
            Find your Perfect Spaces
          </div>
          <div className='mt-3 text-lg opacity-90'>
            Book a room for meetings, study, or coworking—anytime, anywhere.
          </div>
        </div>
        <div className='container-wrapper gap-6'>
          <div className='container border-b border-dashed'>
            <div className='flex flex-col items-center py-6'>
              <div className='w-full rounded-md inset-shadow-sm p-6'>
                <div className='flex gap-4 overflow-y-scroll no-scrollbar'>
                  {spaces.spaces.map((space) => (
                    <Link key={space._id} href={`/spaces/${space._id}`}>
                      <Card
                        key={space._id}
                        className='min-w-[375px] rounded-lg overflow-hidden pt-0 min-h-[24rem]'
                      >
                        <div className='relative bg-muted block'>
                          <AspectRatio ratio={16 / 9}>
                            <Suspense
                              fallback={
                                <div className='bg-black size-full'>
                                  TESTSETETSET
                                </div>
                              }
                            >
                              <Image
                                key={space._id}
                                src={`/spaces${space.image}`}
                                alt='Card Image'
                                fill
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
                              <MapPin className='w-4 h-4' />
                              {`${space.address}, ${space.district}, ${space.province}`}
                            </CardDescription>
                          </div>
                        </CardContent>
                        <CardFooter className='mt-auto'>
                          <div className='flex flex-col justify-between items-start w-full space-y-4'>
                            <div className='flex w-full items-center justify-between'>
                              <div className='text-gray-500 text-sm flex gap-1 items-center'>
                                <Clock className='w-4 h-4' />
                                {`${space.opentime.slice(0, 2)}:${space.opentime.slice(2)} - ${space.closetime.slice(0, 2)}:${space.closetime.slice(2)}`}
                              </div>
                              <div className='text-gray-500 text-sm flex gap-1 items-center'>
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
          <div className='container'>
            <HomePage />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
