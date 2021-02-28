import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [UsersModule, AuthModule, PostsModule],
})
export class ModulesModule {}
