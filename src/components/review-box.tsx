'use client'

import { useEffect, useRef, useState } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { Star, ArrowBigUp, ArrowBigDown } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Review } from '@/interfaces/review.interface'
import { voteReview } from '@/repo/reviews'
import ReviewActions from './reviews-actions'

import { Card, CardContent, CardHeader } from './ui/card'

const ReviewBox = ({ review }: { review: Review }) => {
  const { data: session } = useSession()

  const [userVotedUp, setUserVotedUp] = useState(false)
  const [userVotedDown, setUserVotedDown] = useState(false)
  const [votes, setVotes] = useState(
    review.upVote.length - review.downVote.length,
  )
  const upVoteArray = useRef([...review.upVote])
  const downVoteArray = useRef([...review.downVote])
  // const router = useRouter()

  useEffect(() => {
    if (session?.user?._id) {
      setUserVotedUp(review.upVote.includes(session.user._id))
      setUserVotedDown(review.downVote.includes(session.user._id))
    }
  }, [session?.user?._id, review.upVote, review.downVote])

  const handleVote = async (isUpVote: boolean) => {
    if (!session?.user?._id) {
      toast.error('You must be logged in to vote')
      return
      // TODO: redirect to login page
    }

    const userId = session.user._id

    try {
      if (isUpVote) {
        if (userVotedUp) {
          setUserVotedUp(false)
          setVotes((v) => v - 1)
        } else {
          if (userVotedDown) {
            setUserVotedDown(false)
            setVotes((v) => v + 2)
          } else {
            setVotes((v) => v + 1)
          }
          setUserVotedUp(true)
        }
      } else {
        if (userVotedDown) {
          setUserVotedDown(false)
          setVotes((v) => v + 1)
        } else {
          if (userVotedUp) {
            setUserVotedUp(false)
            setVotes((v) => v - 2)
          } else {
            setVotes((v) => v - 1)
          }
          setUserVotedDown(true)
        }
      }

      // super logic
      if (isUpVote) {
        if (!upVoteArray.current.includes(userId)) {
          upVoteArray.current.push(userId)
        } else {
          upVoteArray.current = upVoteArray.current.filter(
            (id) => id !== userId,
          )
        }
        downVoteArray.current = downVoteArray.current.filter(
          (id) => id !== userId,
        )
      }

      if (!isUpVote) {
        if (!downVoteArray.current.includes(userId)) {
          downVoteArray.current.push(userId)
        } else {
          downVoteArray.current = downVoteArray.current.filter(
            (id) => id !== userId,
          )
        }
        upVoteArray.current = upVoteArray.current.filter((id) => id !== userId)
      }

      await voteReview(
        review.spaceId,
        review._id,
        upVoteArray.current,
        downVoteArray.current,
        session?.accessToken || '',
      )
      // router.refresh()
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
      else toast.error('Something went wrong')
    }
  }
  return (
    <>
      <Card className='w-full'>
        <CardHeader className='flex flex-row items-center justify-between gap-4 pb-2'>
          <div className='flex items-center gap-4'>
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
                        className={`h-4 w-4 ${
                          review.rating >= i + 0.5
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    </div>
  
                    <Star
                      className={`h-4 w-4 ${
                        i + 1 <= review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  </div>
                ))}
                <span className='ml-2 text-xs text-muted-foreground'>
                  Edited{' '}
                  {formatDistanceToNow(review.updatedAt, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          {session?.user?._id === review.userId._id && (
            <ReviewActions
              spaceId={review.spaceId}
              reviewId={review._id}
              token={session?.accessToken || ''}
            />
          )}
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>{review.comment}</p>
          <div className='flex items-center gap-2'>
            <ArrowBigUp
              className={`h-4 w-4 cursor-pointer ${
                userVotedUp ? 'text-blue-500' : 'text-black'
              }`}
              onClick={() => handleVote(true)}
            />
            <p className='text-sm text-muted-foreground'>{votes}</p>
            <ArrowBigDown
              className={`h-4 w-4 cursor-pointer ${
                userVotedDown ? 'text-red-500' : 'text-black'
              }`}
              onClick={() => handleVote(false)}
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default ReviewBox
