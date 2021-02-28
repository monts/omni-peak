import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'

import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'
import { PostsRepository } from './repositories/posts.repository'

@Module({
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
