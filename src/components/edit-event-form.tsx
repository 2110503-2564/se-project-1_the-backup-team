'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
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
  DialogTrigger,
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

import { Space } from '@/interfaces/space.interface'
import { Event } from '@/interfaces/event.interface'
import { useEditEventModal } from '@/context/event-status'

const formSchema = z.object({
  name: z.string(),

  // space: z.string(),

  description: z.string(),

  host: z.string(),

  capacity: z.number({
    required_error: "Capacity is required",
    invalid_type_error: "Capacity must be a number",
  }),

  // status: z.string(),

  startDate: z
    .string()
    .refine((value) => /^([0-1][0-9]|2[0-3])[0-5][0-9]$/.test(value), {
      message: 'Invalid format HHmm',
    }),

  endDate: z
  .string()
  .refine((value) => /^([0-1][0-9]|2[0-3])[0-5][0-9]$/.test(value), {
    message: 'Invalid format HHmm',
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

  attendee: z.number({
    required_error: "Attendee is required",
    invalid_type_error: "Attendee must be a number",
  })
})

const AddEventEditForm = (
  {
    event,
  }: 
  {
    event: Event,
  }
) => {
  const router = useRouter()
  const { isEventModalOpen, closeEventModal } = useEditEventModal()

  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState(event.name);
  const [originalName, _setOriginalName] = useState(event.name);

  const [description, setDescription] = useState(event.description);
  const [originalDescription, _setOriginalDescription] = useState(event.description);

  const [image, setImage] = useState(event.image);
  const [originalImage, _setOriginalImage] = useState(event.image);

  const [host, setHost] = useState(event.host);
  const [originalHost, _setOriginalHost] = useState(event.host);

  const [capacity, setCapacity] = useState(event.capacity);
  const [originalCapacity, _setOriginalCapacity] = useState(event.capacity);

  const [startDate, setStartDate] = useState(event.startDate);
  const [originalStartDate, _setOriginalStartDate] = useState(event.startDate);

  const [endDate, setEndDate] = useState(event.endDate);
  const [originalEndDate, _setOriginalEndDate] = useState(event.endDate);

  const [attendee, setAttendee] = useState(event.attendee);
  const [originalAttendee, _setOriginalAttendee] = useState(event.attendee);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      image: image,
      description: description,
      host: host,
      capacity: capacity,
      startDate: startDate,
      endDate: endDate,
      attendee: attendee
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      if (!session?.accessToken) throw new Error('Unauthorized')
      // await addSpace(values, session.accessToken)
      toast.success('Your event was successfully updated')
      router.refresh()
    } catch (e) {
      toast.error('Event update failed.')
    } finally {
      form.reset()
      setOpen(false)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isEventModalOpen} onOpenChange={(open) => { if (!open) closeEventModal() }}>
      {/* <DialogTrigger asChild>{children}</DialogTrigger> */}
      <DialogContent className='sm:max-w-[550px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update Details</DialogTitle>
              <DialogDescription>
              Please review and update your information below.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-5 py-4'>
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
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder='Example description' {...field} />
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

              <div className='grid grid-cols-3 gap-4'>
                <FormField
                  control={form.control}
                  name='capacity'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input placeholder='0' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='attendee'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attendee</FormLabel>
                      <FormControl>
                        <Input placeholder='0' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='startDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open</FormLabel>
                      <FormControl>
                        <Input placeholder='2942025' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='endDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Close</FormLabel>
                      <FormControl>
                        <Input placeholder='3042025' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  'Update review'
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