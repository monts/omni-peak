import { IRole } from '../enums/Role'

export class CreateUserDto {
  name: string
  email: string
  password: string
  role?: IRole
}
