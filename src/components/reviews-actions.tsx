'use client'

import { MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit, Trash ,MoreHorizontalIcon } from 'lucide-react'
import { deleteReview } from '@/repo/reviews'

const ReviewActions = ({
  spaceId,
  reviewId,
  token,
}: {
  spaceId: string
  reviewId: string
  token: string
}) => {
  const router = useRouter()

  const handleDelete = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    try {
      const response = await deleteReview(spaceId, reviewId, token)

      if (!response.success) {
        toast.error(response.message || 'Failed to delete review')
        return
      }

      toast.success('Review deleted successfully')
      router.refresh()
    } catch (e) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
        <MoreHorizontalIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <Edit className='mr-2 h-4 w-4' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='text-red-600'
          onClick={handleDelete}
        >
          <Trash className='mr-2 h-4 w-4 text-red-600' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ReviewActions