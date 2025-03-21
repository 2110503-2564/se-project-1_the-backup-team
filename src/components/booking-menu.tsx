'use client'
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
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Room, Space } from '@/interfaces/space.interface'
import { useState } from 'react'
import { CalendarFold, CalendarIcon, DoorClosed } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'

const BookingMenu = ({ space }: { space: Space }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined)
  const [date, setDate] = useState<Date>()
  return (
    <div>
      <Card className='sticky top-20'>
        <CardHeader>
          <CardTitle className='text-xl'>Book a room in this space</CardTitle>
          <CardDescription className='text-md'>
            Select a room, date, and time to make your reservation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='mb-4'>
              <div className='font-medium mb-2'>Room</div>
              <div className='flex gap-1 items-baseline'>
                <div className='text-3xl font-bold'>
                  {selectedRoom?.roomNumber || '-'}
                </div>
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='mb-4'>
              <div className='font-medium mb-2'>Price</div>
              <div className='flex gap-1 items-baseline'>
                <div className='text-3xl font-bold'>
                  {selectedRoom?.price || 0} ฿
                </div>
                <div className='text-md text-muted-foreground'>/ session</div>
              </div>
            </div>
          </div>

          <div className='w-full grid grid-cols-2 gap-2'>
            <div className='rounded-md basis-1/2'>
              <Select
                value={selectedRoom?._id}
                onValueChange={(val) => {
                  const room = space.rooms.find((room) => room._id === val)
                  setSelectedRoom(room)
                }}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a room' />
                </SelectTrigger>
                <SelectContent>
                  {space.rooms.map((room) => (
                    <SelectItem key={room._id} value={room._id}>
                      {room.roomNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <div className='w-full basis-1/2'>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        <CardFooter>
          <div className='w-full grid grid-cols-4 lg:grid-cols-2 gap-2'>
            <Button
              variant='outline'
              className='basis-1/2 col-start-3 lg:col-start-1'
            >
              Contact Host
            </Button>
            <Button className='basis-1/2'>Reserve</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BookingMenu
