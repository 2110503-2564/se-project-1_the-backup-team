'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createEvent } from '@/repo/events'

const CreateEventPopup = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false) // State สำหรับควบคุมการแสดงผลของ Popup
  const [formData, setFormData] = useState({
    name: '',
    space: '',
    description: '',
    host: '',
    capacity: '',
    startDate: '',
    endDate: '',
    image: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const { name, space, description, host, capacity, startDate, endDate, image } = formData

    if (!name || !space || !description || !host || !capacity || !startDate || !endDate) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      await createEvent({
        name,
        space,
        description,
        host,
        capacity: Number(capacity),
        startDate,
        endDate,
        image,
      })
      toast.success('Event created successfully')
      setIsOpen(false) 
      router.refresh() 
    } catch (e) {
      toast.error('Failed to create event')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-md">
          <Plus className="mr-2" />
          Host New Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>Fill in the details below to create a new event.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            name="space"
            placeholder="Space ID"
            value={formData.space}
            onChange={handleChange}
          />
          <Textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            className="max-w-115 overflow-y-auto resize-x"
          />
          <Input
            name="host"
            placeholder="Host Name"
            value={formData.host}
            onChange={handleChange}
          />
          <Input
            name="capacity"
            type="number"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
          <Input
            name="startDate"
            type="datetime-local"
            placeholder="Start Date"
            value={formData.startDate}
            onChange={handleChange}
          />
          <Input
            name="endDate"
            type="datetime-local"
            placeholder="End Date"
            value={formData.endDate}
            onChange={handleChange}
          />
          <Input
            name="image"
            placeholder="Image URL"
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