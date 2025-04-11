'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { addSpace } from '@/repo/spaces'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Space name must be at least 1 character',
  }),
  address: z.string(),
  district: z.string(),
  province: z.string(),
  postalcode: z.string(),
  tel: z.string(),
  opentime: z
    .string()
    .refine((value) => /^([0-1][0-9]|2[0-3])[0-5][0-9]$/.test(value), {
      message: 'Invalid format HHmm',
    }),
  closetime: z
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
})

const AddSpaceForm = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      image: '',
      address: '',
      district: '',
      province: '',
      postalcode: '',
      tel: '',
      opentime: '',
      closetime: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      if (!session?.accessToken) throw new Error('Unauthorized')
      await addSpace(values, session.accessToken)
      toast.success('Space created')
      router.refresh()
    } catch (e) {
      toast.error('Space creation failed')
    } finally {
      form.reset()
      setOpen(false)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[550px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create new space</DialogTitle>
              <DialogDescription>
                Enter space information to add space.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-5 py-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Space name</FormLabel>
                    <FormControl>
                      <Input placeholder='Example Space' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='tel'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder='021560395' {...field} />
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
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder='1/42 Phayathai Road' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-3 gap-4'>
                <FormField
                  control={form.control}
                  name='district'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input placeholder='Pathum Wan' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='province'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Input placeholder='Bangkok' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='postalcode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder='10330' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='opentime'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open</FormLabel>
                      <FormControl>
                        <Input placeholder='0930' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='closetime'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Close</FormLabel>
                      <FormControl>
                        <Input placeholder='2300' {...field} />
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
                    Creating a space...
                  </>
                ) : (
                  'Add space'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddSpaceForm
