import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcryptjs'
import { PrismaService } from 'src/shared/prisma/prisma.service'

import { CreateUserDto } from '../dtos/create-user.dto'
import { UpdateUserDto } from '../dtos/update-user.dto'
import { User } from '../entities/user.entity'

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const password = await hash(data.password, 8)

    const user = await this.prisma.user.create({ data: { ...data, password } })

    return user
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { id } })

    return user
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    try {
      const validate = await compare(password, hash)

      return validate
    } catch {
      return false
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { email } })

    return user
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    let password = data.password

    if (password) {
      password = await hash(password, 8)
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: { ...data, password },
    })

    return user
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } })
  }
}
