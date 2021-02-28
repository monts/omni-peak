import { Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { SeedsService } from './seeds.service'

@Module({
  providers: [PrismaService, SeedsService],
  exports: [PrismaService, SeedsService],
})
export class PrismaModule {
  constructor(private seeds: SeedsService) {
    seeds.seedAll()
  }
}
