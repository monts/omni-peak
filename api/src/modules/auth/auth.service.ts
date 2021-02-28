import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { plainToClass } from 'class-transformer'

import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)

    if (
      user &&
      (await this.usersService.validatePassword(password, user.password))
    ) {
      return plainToClass(User, user)
    }

    return null
  }

  async login(user: any) {
    const payload = { id: user.id, sub: user.id, role: user.role }
    return {
      user: user,
      token: this.jwtService.sign(payload),
    }
  }
}
