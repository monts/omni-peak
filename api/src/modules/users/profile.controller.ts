import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UpdateUserDto } from './dtos/update-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() request: Request) {
    const user = await this.usersService.findById(request.user.id)

    return plainToClass(User, user)
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(request.user.id, updateUserDto)

    return plainToClass(User, user)
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async remove(@Req() request: Request) {
    await this.usersService.remove(request.user.id)
  }
}
