import { Injectable } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { seedUsers } from './seeds/users'

@Injectable()
export class SeedsService {
  constructor(private prisma: PrismaService) {}

  async seedAll() {
    const users = seedUsers(this.prisma)

    await Promise.all([users])
  }
}
