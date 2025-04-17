'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import clsx from 'clsx'
import { Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { updateReview } from '@/repo/reviews'
import { Review } from '@/interfaces/review.interface'
import { Space } from '@/interfaces/space.interface'
import { useEditModal } from '@/context/edited-status'

const EditReview = ({ space, review }: { space: Space, review: Review }) => {
  const { data: session } = useSession()
  const { closeModal } = useEditModal()
  const [comment, setReview] = useState(review.comment)
  const [rating, setRating] = useState(review.rating)
  const router = useRouter()

  const handleStarClick = (index: number, isHalf: boolean) => {
    if (index === 0 && isHalf) return

    const newRating = isHalf ? index + 0.5 : index + 1
    setRating(newRating)
  }

  const handleSubmit = async () => {
    try {
      await updateReview(space._id, review._id, comment, rating, session?.accessToken || '')
      toast.success('Updated Review')
      closeModal()
      router.refresh()
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
      else toast.error('Something went wrong')
    }
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Edit Your Review</h2>
      editing
      <div className='flex items-center gap-1'>
        {[...Array(5)].map((_, index) => {
          const full = index + 1 <= rating

          return (
            <div key={index} className='relative'>
              <Star
                className={clsx(
                  'w-5 h-5 absolute left-0 cursor-pointer',
                  rating >= index + 0.5
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-400',
                )}
                onClick={() => handleStarClick(index, true)}
                style={{ clipPath: 'inset(0 50% 0 0)' }}
              />
              <Star
                className={clsx(
                  'w-5 h-5 cursor-pointer',
                  full ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400',
                )}
                onClick={() => handleStarClick(index, false)}
              />
            </div>
          )
        })}
        <span className='text-sm text-muted-foreground'>({rating})</span>
      </div>

      <Textarea
        placeholder='type your review...'
        value={comment}
        onChange={(e) => setReview(e.target.value)}
        className='min-h-[120px]'
      />

      <Button
        onClick={handleSubmit}
        disabled={rating === 0 || comment.trim() === ''}
      >
        Submit
      </Button>
    </div>
  )
}

export default EditReview
