'use client'

import { formatDistanceToNow } from 'date-fns'
import { Star } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Review } from '@/interfaces/review.interface'

import { Card, CardContent, CardHeader } from './ui/card'

const ReviewBox = ({ review }: { review: Review }) => {
  return (
    <>
      <Card className='w-full'>
        <CardHeader className='flex flex-row items-center gap-4 pb-2'>
          <Avatar>
            <AvatarImage
              src={review.userId.image || '/profile/profile-0.jpg'}
              alt={review.userId.name}
            />
            <AvatarFallback>
              <div className='size-full bg-muted'></div>
            </AvatarFallback>
          </Avatar>
          <div className='grid gap-1'>
            <p className='text-sm font-medium leading-none'>
              {review.userId.name}
            </p>
            <div className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <div key={`star-${review._id}-${i}`} className='relative'>
                  <div className='absolute left-0 w-1/2 h-full overflow-hidden'>
                    <Star
                      className={`h-4 w-4 ${review.rating >= i + 0.5 ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
                    />
                  </div>

                  <Star
                    className={`h-4 w-4 ${i + 1 <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
                  />
                </div>
              ))}
              <span className='ml-2 text-xs text-muted-foreground'>
                {formatDistanceToNow(review.createdAt, { addSuffix: true })}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>{review.comment}</p>
        </CardContent>
      </Card>
    </>
  )
}

export default ReviewBox
