import BookingMenu from '@/components/booking-menu'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getSpaceById } from '@/repo/spaces'
import { SelectValue } from '@radix-ui/react-select'
import {
  ArrowLeft,
  Clock,
  Coins,
  MapPin,
  Smartphone,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const SpacePage = async ({ params }: { params: { sid: string } }) => {
  let space
  try {
    space = await getSpaceById(params.sid)
  } catch (_) {
    return (
      <div className='container py-24 text-center text-lg font-semibold'>
        Space not found
      </div>
    )
  }

  return (
    <>
      <Button variant='ghost' size='sm' asChild className='mb-6'>
        <Link href='/spaces'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to spaces
        </Link>
      </Button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <AspectRatio ratio={16 / 9}>
            <Image
              src='https://placehold.co/1200x800.png'
              alt='Card Image'
              fill
              className='rounded-lg object-cover'
            />
          </AspectRatio>

          <div className='mt-6'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <div>
                <h1 className='text-3xl font-bold'>{space.name}</h1>
                <div className='flex items-center mt-2 text-muted-foreground'>
                  <MapPin className='h-4 w-4 mr-1' />
                  <span>{`${space.address}, ${space.district}, ${space.province}`}</span>
                </div>
              </div>
            </div>
            <Separator className='my-6' />
            <Tabs defaultValue='about'>
              <TabsList>
                <TabsTrigger value='about'>About</TabsTrigger>
                <TabsTrigger value='reviews'>Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value='about' className='mt-4'>
                <div className='flex flex-col gap-5 text-lg font-medium'>
                  <div className='flex gap-2 items-center'>
                    <Smartphone className='w-6 h-6' />
                    {space.tel}
                  </div>
                  <div className='flex gap-2 items-center'>
                    <Clock className='w-6 h-6' />
                    {`${space.opentime.slice(0, 2)}:${space.opentime.slice(2)} - ${space.closetime.slice(0, 2)}:${space.closetime.slice(2)}`}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='reviews' className='mt-4'>
                <p>Reviews coming soon.</p>
              </TabsContent>
            </Tabs>
          </div>

          <h2 className='text-2xl font-bold mt-10 mb-6'>Available Rooms</h2>
          <Separator className='my-6' />
          <div className='grid grid-cols-2 gap-6'>
            {space.rooms.map((room) => (
              <Card key={room._id} className='w-full pt-0 rounded-lg'>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src='https://placehold.co/600x400.png'
                    alt='Card Image'
                    fill
                    className='rounded-t-md object-cover'
                  />
                </AspectRatio>
                <CardContent className='space-y-2'>
                  <CardTitle className='text-xl font-bold truncate'>
                    {room.roomNumber}
                  </CardTitle>
                  <CardDescription className='text-muted-foreground space-y-1'>
                    <div className='flex gap-1 overflow-x-auto no-scrollbar'>
                      {room.facilities.map((item) => (
                        <Badge key={item} variant='outline'>
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardDescription>
                </CardContent>
                <CardFooter className='pt-0 mt-auto flex justify-between'>
                  <div className='flex gap-5'>
                    <div className='flex gap-2 items-center'>
                      <Users className='w-4 h-4' />
                      {room.capacity}
                    </div>
                    <div className='flex gap-2 items-center'>
                      <Coins className='w-4 h-4' />
                      {room.price} ฿
                    </div>
                  </div>

                  <Button size='sm' type='submit'>
                    Select this room
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <BookingMenu space={space} />
      </div>
    </>
  )
}

export default SpacePage
