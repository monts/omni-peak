import { Post as PostDB } from '@prisma/client'
import { User } from 'src/modules/users/entities/user.entity'

export class Post implements PostDB {
  id: string
  slug: string
  title: string
  text: string
  published: boolean
  userId: string
  user?: User
  createdAt: Date
  updatedAt: Date
}
