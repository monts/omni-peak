import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { plainToClass } from 'class-transformer'

import { Roles } from '../auth/decorators/roles.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { CreateUserDto } from './dtos/create-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)

    return plainToClass(User, user)
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findAll() {
    const users = await this.usersService.findAll()

    return plainToClass(User, users)
  }
}
