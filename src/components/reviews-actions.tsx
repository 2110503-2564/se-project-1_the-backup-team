'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Edit, Trash, MoreHorizontalIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import ConfirmBox from '@/components/ui/confirmbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEditModal } from '@/context/edited-status'
import { deleteReview } from '@/repo/reviews'

const ReviewActions = ({
  spaceId,
  reviewId,
  token,
  reviewUserId,
}: {
  spaceId: string
  reviewId: string
  token: string
  reviewUserId: string
}) => {
  const { data: session } = useSession()
  const router = useRouter()
  const { openModal } = useEditModal()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
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
    } finally {
      setShowConfirm(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <MoreHorizontalIcon className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {session?.user._id === reviewUserId && (
            <>
              <DropdownMenuItem
                onClick={() => {
                  openModal()
                  toast.success('Edit mode activated')
                }}
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            className='text-red-600'
            onClick={() => {
              setShowConfirm(true)
            }}
          >
            <Trash className='mr-2 h-4 w-4 text-red-600' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showConfirm && (
        <ConfirmBox
          question='Are you sure you want to delete this review?'
          confirmColor='bg-red-500'
          cancelColor='bg-gray-500'
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  )
}

export default ReviewActions
