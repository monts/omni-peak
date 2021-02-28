import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'

import { ProfileController } from './profile.controller'
import { UsersRepository } from './repositories/users.repository'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [PrismaModule],
  controllers: [UsersController, ProfileController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
