import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'

import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { User } from './entities/user.entity'
import { UsersRepository } from './repositories/users.repository'

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.create(createUserDto)

      return user
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.findAll()

    return users
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  async validatePassword(password: string, hash: string) {
    const validate = await this.usersRepository.validatePassword(password, hash)

    return validate
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new NotFoundException()
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailExists = await this.usersRepository.findByEmail(
        updateUserDto.email
      )

      if (emailExists) {
        throw new UnauthorizedException('This e-mail already in use.')
      }
    }

    if (updateUserDto.password || updateUserDto.oldPassword) {
      if (
        await this.usersRepository.validatePassword(
          updateUserDto.oldPassword,
          user.password
        )
      ) {
        if (updateUserDto.password === updateUserDto.confirmPassword) {
          try {
            await this.usersRepository.update(id, {
              password: updateUserDto.password,
            })
          } catch {
            throw new InternalServerErrorException()
          }
        } else {
          throw new BadRequestException(
            'Password and password confirmation are different.'
          )
        }
      } else {
        throw new UnauthorizedException('Old password is not valid.')
      }
    }
    delete updateUserDto.password
    delete updateUserDto.oldPassword
    delete updateUserDto.confirmPassword

    try {
      const updatedUser = await this.usersRepository.update(id, updateUserDto)

      return updatedUser
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new NotFoundException()
    }

    try {
      await this.usersRepository.delete(id)
    } catch {
      throw new InternalServerErrorException()
    }
  }
}
