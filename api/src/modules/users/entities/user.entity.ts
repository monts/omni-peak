import { User as UserDB } from '@prisma/client'
import { Exclude } from 'class-transformer'

import { IRole } from '../enums/Role'

export class User implements UserDB {
  id: string
  name: string
  email: string
  role: IRole

  @Exclude()
  password: string

  createdAt: Date
  updatedAt: Date
}
