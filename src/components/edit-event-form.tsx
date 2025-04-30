'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Box, CalendarIcon, Clock, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
import { useEditEventModal } from '@/context/event-status'
import { Event } from '@/interfaces/event.interface'
import { Space } from '@/interfaces/space.interface'
import { cn } from '@/lib/utils'
import { updateEvent } from '@/repo/events'
import { fetchSpaces } from '@/repo/spaces'

import { Calendar } from './ui/calendar'
import { Textarea } from './ui/textarea'

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name cannot be empty',
    })
    .max(50, {
      message: 'Must be 50 or fewer characters long',
    }),

  space: z.object({
    _id: z.string(),
    name: z.string(),
  }),

  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(1, { message: 'Description cannot be empty' }),

  host: z
    .string({
      required_error: 'Host is required',
      invalid_type_error: 'Host must be a string',
    })
    .min(1, { message: 'Host cannot be empty' }),

  capacity: z
    .number({
      required_error: 'Capacity is required',
      invalid_type_error: 'Capacity must be a number',
    })
    .int()
    .min(1, { message: 'Capacity must be greater than 0' }),

  startDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: 'Invalid ISO 8601 date-time string',
  }),

  endDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: 'Invalid ISO 8601 date-time string',
  }),
  image: z
    .string()
    .min(2, {
      message: 'Image url too short',
    })
    .startsWith('/', {
      message: 'Image url must be started with /',
    })
    .endsWith('.jpg', {
      message: 'Image url must be a jpg',
    })
    .optional(),
  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.from === undefined || data.to === undefined) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please select a date range.',
        })
      }
      return data
    }),
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time must be in the format hh:mm',
  }),
  endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time must be in the format hh:mm',
  }),
})

const AddEventEditForm = ({ event }: { event: Event }) => {
  const router = useRouter()
  const { isEventModalOpen, closeEventModal } = useEditEventModal()

  const fromDate = new Date()

  const { data: session } = useSession()
  const [_open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [originalName, _setOriginalName] = useState(event.name)

  const [originalDescription, _setOriginalDescription] = useState(
    event.description,
  )

  const [originalSpace, _setOriginalSpace] = useState(event.space)

  const [originalImage, _setOriginalImage] = useState(event.image)

  const [originalHost, _setOriginalHost] = useState(event.host)

  const [originalCapacity, _setOriginalCapacity] = useState(event.capacity)

  const [originalStartDate, _setOriginalStartDate] = useState(event.startDate)

  const [originalEndDate, _setOriginalEndDate] = useState(event.endDate)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: originalName,
      image: originalImage,
      description: originalDescription,
      host: originalHost,
      space: originalSpace,
      capacity: originalCapacity,
      startDate: originalStartDate,
      endDate: originalEndDate,
      dateRange: {
        from: new Date(originalStartDate),
        to: new Date(originalEndDate),
      },
      startTime: format(originalStartDate, 'hh:mm'),
      endTime: format(originalEndDate, 'hh:mm'),
    },
  })

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      if (!session?.accessToken) throw new Error('Unauthorized')
      if (!values.dateRange || !values.dateRange.from || !values.dateRange.to)
        return
      if (values.capacity < event.attendee)
        return toast.error('Capacity must be greater than or equal to attendee')

      const startHours = parseInt(values.startTime.substring(0, 2))
      const startMinutes = parseInt(values.startTime.substring(3, 5))

      values.dateRange.from.setHours(startHours)
      values.dateRange.from.setMinutes(startMinutes)

      const endHours = parseInt(values.endTime.substring(0, 2))
      const endMinutes = parseInt(values.endTime.substring(3, 5))

      values.dateRange.to.setHours(endHours)
      values.dateRange.to.setMinutes(endMinutes)

      values.startDate = values.dateRange.from.toISOString()
      values.endDate = values.dateRange.to.toISOString()

      await updateEvent(event._id, values, session.accessToken)

      toast.success('Your event was successfully updated')
      router.refresh()
    } catch (e) {
      console.log(e)

      toast.error('Event update failed.')
    } finally {
      setOpen(false)
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

  return (
    <Dialog
      open={isEventModalOpen}
      onOpenChange={(open) => {
        if (!open) closeEventModal()
      }}
    >
      <DialogContent className='sm:max-w-[550px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update Details</DialogTitle>
              <DialogDescription>
                Please review and update your information below.
              </DialogDescription>
            </DialogHeader>

            <div className='grid gap-6 py-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Somchai Freeman' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='host'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Host</FormLabel>
                      <FormControl>
                        <Input placeholder='Your host' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='image'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder='/example.jpg' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Example description'
                        {...field}
                        className='h-32'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='capacity'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Enter capacity'
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='space'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Space</FormLabel>
                      <FormControl>
                        <div className='rounded-md basis-1/2'>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value._id}
                            required
                          >
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='dateRange'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date range</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className='w-full'>
                            <Button
                              variant={'outline'}
                              type='button'
                              className={cn(
                                'w-full justify-start text-left font-normal cursor-pointer',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              <CalendarIcon />
                              {field.value?.from ? (
                                field.value.to ? (
                                  <>
                                    {format(field.value.from, 'LLL dd, y')} -{' '}
                                    {format(field.value.to, 'LLL dd, y')}
                                  </>
                                ) : (
                                  format(field.value.from, 'LLL dd, y')
                                )
                              ) : (
                                <span>Pick a date range</span>
                              )}
                            </Button>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            fromDate={fromDate}
                            selected={field.value as DateRange}
                            onSelect={field.onChange}
                            mode='range'
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex gap-2 items-center'>
                <div className='rounded-md basis-1/2'>
                  <FormField
                    control={form.control}
                    name='startTime'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start time</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            required
                          >
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='rounded-md basis-1/2'>
                  <FormField
                    control={form.control}
                    name='endTime'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End time</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            required
                          >
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className='mt-6'>
              <Button
                type='submit'
                className='cursor-pointer'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Updating the event...
                  </>
                ) : (
                  'Update event'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEventEditForm
