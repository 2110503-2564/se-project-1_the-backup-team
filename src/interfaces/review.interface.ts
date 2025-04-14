export interface Review {
  _id: string
  userId: {
    name: string
    _id: string
    image?: string
  }
  spaceId: string
  comment: string
  rating: number
  upVote: string[]
  downVote: string[]
  createdAt: string
  updatedAt: string
}
