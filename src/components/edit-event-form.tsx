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
import { updateEvent } from '@/repo/events'

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name cannot be empty"
   })
    .max(50, {
       message: "Must be 50 or fewer characters long"
    }),

  space: z.object({
    _id: z.string(),
    name: z.string(),
  }),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(1, { message: "Description cannot be empty" }),

  host: z
    .string({
      required_error: "Host is required",
      invalid_type_error: "Host must be a string",
    })
    .min(1, { message: "Host cannot be empty" }),

  capacity: z
  .number({
    required_error: "Capacity is required",
    invalid_type_error: "Capacity must be a number",
  })
  .int()
  .min(1, { message: "Capacity must be greater than 0" }),

  startDate: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: 'Invalid ISO 8601 date-time string',
    }),

  endDate: z
  .string()
  .refine((value) => !isNaN(Date.parse(value)), {
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
})

const AddEventEditForm = (
  {
    event,
    spaces
  }: 
  {
    event: Event,
    spaces: Space[]
  }
) => {
  const router = useRouter()
  const { isEventModalOpen, closeEventModal } = useEditEventModal()

  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // const [name, setName] = useState(event.name);
  const [originalName, _setOriginalName] = useState(event.name);

  // const [description, setDescription] = useState(event.description);
  const [originalDescription, _setOriginalDescription] = useState(event.description);

  const [originalSpace, _setOriginalSpace] = useState(event.space);

  // const [image, setImage] = useState(event.image);
  const [originalImage, _setOriginalImage] = useState(event.image);

  // const [host, setHost] = useState(event.host);
  const [originalHost, _setOriginalHost] = useState(event.host);

  // const [capacity, setCapacity] = useState(event.capacity);
  const [originalCapacity, _setOriginalCapacity] = useState(event.capacity);

  // const [startDate, setStartDate] = useState(event.startDate);
  const [originalStartDate, _setOriginalStartDate] = useState(event.startDate);

  // const [endDate, setEndDate] = useState(event.endDate);
  const [originalEndDate, _setOriginalEndDate] = useState(event.endDate);

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
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      if (!session?.accessToken) throw new Error('Unauthorized')
      await updateEvent(event._id, values, session.accessToken)
      toast.success('Your event was successfully updated')
      router.refresh()
    } catch (e) {
      toast.error('Event update failed.')
    } finally {
      setOpen(false)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isEventModalOpen} onOpenChange={(open) => { if (!open) closeEventModal() }}>
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
                      <Input placeholder='Example description' {...field} />
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
                        type="number"
                        placeholder="Enter capacity"
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                      <select
                        value={field.value?._id || ""}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const selectedSpace = spaces.find((s) => s._id === selectedId);
                          field.onChange(selectedSpace);
                        }}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                          <option value="">Select a Space</option>
                          {spaces.map((space) => (
                            <option key={space._id} value={space._id}>
                              {space.name}
                            </option>
                          ))}
                        </select>
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
                        <Input placeholder='Enter Start Date' {...field} />
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
                        <Input placeholder='Enter End Date' {...field} />
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