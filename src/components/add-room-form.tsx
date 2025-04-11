'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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

import { toast } from 'sonner'
import { addRoom } from '@/repo/spaces'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

const formSchema = z.object({
  roomNumber: z.string().min(1, {
    message: 'Room number must be at least 1 character',
  }),
  image: z
    .string()
    .min(2, {
      message: 'Image url must be at least 2 characters',
    })
    .startsWith('/', {
      message: 'Image url must be started with /',
    })
    .endsWith('.jpg', {
      message: 'Image url must be a jpg',
    })
    .optional(),
  capacity: z.coerce
    .number()
    .positive({ message: 'Capacity must be a positive number' }),
  price: z.coerce
    .number()
    .nonnegative({ message: 'Price must be a non-negative number' }),
  facilities: z
    .string()
    .refine((value) => /^[a-zA-Z0-9\s]+(,[a-zA-Z0-9\s]+)*$/.test(value), {
      message: 'Facilities must be a comma-separated list',
    })
    .transform((val) => val.split(',').map((item) => item.trim()))
    .optional(),
})

const AddRoomForm = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  const { sid } = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: '',
      image: '',
      capacity: 4,
      price: 200,
      facilities: undefined,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      if (!session?.accessToken) throw new Error('Unauthorized')
      if (typeof sid !== 'string') throw new Error('Invalid space ID')
      await addRoom(sid, values, session.accessToken)
      toast.success('Room created')
      router.refresh()
    } catch (e) {
      toast.error('Room creation failed')
    } finally {
      form.reset()
      setIsLoading(false)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add new room</DialogTitle>
              <DialogDescription>
                Enter room information to add room.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-5 py-4'>
              <FormField
                control={form.control}
                name='roomNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room no.</FormLabel>
                    <FormControl>
                      <Input placeholder='404' {...field} />
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
                      <Input placeholder='/image.jpg' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name='capacity'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='4' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='200' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='facilities'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facilities</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Whiteboard, WiFi, Coffee'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    Creating a room...
                  </>
                ) : (
                  'Add room'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddRoomForm
