'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { format } from 'date-fns'
import { Box, CalendarIcon, Clock } from 'lucide-react'
import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { DateRange } from 'react-day-picker'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Space } from '@/interfaces/space.interface'
import { cn } from '@/lib/utils'
import { createEvent } from '@/repo/events'
import { fetchSpaces } from '@/repo/spaces'

const CreateEventPopup = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    host: '',
    image: '',
  })
  const [capacity, setCapacity] = useState('')
  const [date, setDate] = useState<DateRange | undefined>()
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [space, setSpace] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fromDate = new Date()

  const timeslots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
      .toString()
      .padStart(2, '0')
    const minute = i % 2 === 0 ? '00' : '30'
    return {
      time: `${hour}:${minute}`,
      available: true,
    }
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const { name, description, host, image } = formData

    if (
      !name ||
      !description ||
      !host ||
      space == '0' ||
      !date ||
      !date.from ||
      !date.to ||
      startTime == '' ||
      endTime == '' ||
      !capacity ||
      capacity == '' ||
      capacity == '0'
    ) {
      toast.error('Please fill in all fields')
      return
    }

    const startHours = parseInt(startTime.substring(0, 2))
    const startMinutes = parseInt(startTime.substring(3, 5))

    date.from.setHours(startHours)
    date.from.setMinutes(startMinutes)

    const endHours = parseInt(endTime.substring(0, 2))
    const endMinutes = parseInt(endTime.substring(3, 5))

    date.to.setHours(endHours)
    date.to.setMinutes(endMinutes)

    setIsLoading(true)
    try {
      await createEvent(
        {
          name,
          space,
          description,
          host,
          capacity: parseInt(capacity),
          startDate: date.from.toISOString(),
          endDate: date.to.toISOString(),
          image,
        },
        session?.accessToken || '',
      )
      toast.success('Event created successfully')
      setIsOpen(false)
      router.refresh()
    } catch (e) {
      toast.error('Failed to create event')
    } finally {
      setIsLoading(false)
    }
  }

  const [spaces, setSpaces] = useState<Space[]>([])

  useEffect(() => {
    const fetchSelectSpace = async () => {
      const result = await fetchSpaces(0, 10000)
      setSpaces(result.spaces)
    }

    fetchSelectSpace()
  }, [])

  useEffect(() => {
    setFormData({
      name: '',
      description: '',
      host: '',
      image: '',
    })
    setSpace('')
    setDate(undefined)
    setStartTime('')
    setCapacity('')
    setEndTime('')
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm' className='rounded-md'>
          <Plus className='mr-2' />
          Host New Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new event.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <Input
            name='name'
            placeholder='Event Name'
            value={formData.name}
            onChange={handleChange}
          />
          <div className='rounded-md basis-1/2'>
            <Select value={space} onValueChange={setSpace} required>
              <SelectTrigger className='w-full cursor-pointer'>
                <SelectValue
                  placeholder={
                    <div className='w-full flex items-center gap-2'>
                      <Box />
                      Space
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent className='max-h-64'>
                {spaces.map((t) => (
                  <SelectItem key={t.name} value={t._id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            name='description'
            placeholder='Event Description'
            value={formData.description}
            onChange={handleChange}
            className='max-w-115 overflow-y-auto resize-x'
          />
          <Input
            name='host'
            placeholder='Host Name'
            value={formData.host}
            onChange={handleChange}
          />
          <Input
            name='capacity'
            type='number'
            placeholder='Capacity'
            value={capacity}
            onChange={(e) => {
              setCapacity(e.target.value)
            }}
          />
          <Popover>
            <PopoverTrigger asChild>
              <div className='w-full'>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal cursor-pointer',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='range'
                selected={date}
                onSelect={setDate}
                fromDate={fromDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className='flex gap-2 items-center'>
            <div className='rounded-md basis-1/2'>
              <Select value={startTime} onValueChange={setStartTime} required>
                <SelectTrigger className='w-full cursor-pointer'>
                  <SelectValue
                    placeholder={
                      <div className='w-full flex items-center gap-2'>
                        <Clock />
                        Start time
                      </div>
                    }
                  />
                </SelectTrigger>
                <SelectContent className='max-h-64'>
                  {timeslots.map((t) => (
                    <SelectItem key={t.time} value={t.time}>
                      {t.time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='rounded-md basis-1/2'>
              <Select value={endTime} onValueChange={setEndTime} required>
                <SelectTrigger className='w-full cursor-pointer'>
                  <SelectValue
                    placeholder={
                      <div className='w-full flex items-center gap-2'>
                        <Clock />
                        End time
                      </div>
                    }
                  />
                </SelectTrigger>
                <SelectContent className='max-h-64'>
                  {timeslots.map((t) => (
                    <SelectItem key={t.time} value={t.time}>
                      {t.time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Input
            name='image'
            placeholder='Image URL'
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Event'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEventPopup
