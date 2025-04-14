'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import clsx from 'clsx'
import { Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Space } from '@/interfaces/space.interface'
import { createReview } from '@/repo/reviews'

const CreateReview = ({ space }: { space: Space }) => {
  const { data: session } = useSession()
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0)
  const router = useRouter()

  const handleStarClick = (index: number, isHalf: boolean) => {
    if (index === 0 && isHalf) return

    const newRating = isHalf ? index + 0.5 : index + 1
    setRating(newRating)
  }

  const handleSubmit = async () => {
    try {
      await createReview(space._id, review, rating, session?.accessToken || '')
      toast.success('Review created')
      router.refresh()
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
      else toast.error('Something went wrong')
    } finally {
      setReview('')
      setRating(0)
    }
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Create Your Review</h2>

      <div className='flex items-center gap-1'>
        {[...Array(5)].map((_, index) => {
          const full = index + 1 <= rating

          return (
            <div key={index} className='relative'>
              <Star
                className={clsx(
                  'w-5 h-5 absolute left-0 w-1/2 cursor-pointer',
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
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className='min-h-[120px]'
      />

      <Button
        onClick={handleSubmit}
        disabled={rating === 0 || review.trim() === ''}
      >
        Submit
      </Button>
    </div>
  )
}

export default CreateReview
