import { APIResponse } from '@/interfaces/interface'
import { Review } from '@/interfaces/review.interface'

export const createReview = (
  space: string,
  comment: string,
  rating: number,
  token: string,
) => {
  return new Promise<APIResponse<Review>>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/spaces/${space}/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment, rating }),
          cache: 'no-store',
        },
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create review')
      }

      const body = await response.json()
      resolve(body as APIResponse<Review>)
    } catch (e) {
      reject(e instanceof Error ? e : new Error('Failed to create review'))
    }
  })
}

export const getReviews = (space: string) => {
  return new Promise<APIResponse<Review[]>>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/spaces/${space}/reviews`,
        {
          cache: 'no-store',
        },
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to fetch review')
      }

      const body = await response.json()
      resolve(body as APIResponse<Review[]>)
    } catch (e) {
      reject(e instanceof Error ? e : new Error('Failed to fetch review'))
    }
  })
}

export const voteReview = (
  spaceId: string,
  reviewId: string,
  upVote: string[],
  downVote: string[],
  token: string,
) => {
  return new Promise<APIResponse<Review>>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/spaces/${spaceId}/reviews/${reviewId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ upVote, downVote }),
          cache: 'no-store',
        },
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to vote review')
      }

      const body = await response.json()
      resolve(body as APIResponse<Review>)
    } catch (e) {
      reject(e instanceof Error ? e : new Error('Failed to vote review'))
    }
  })
}
