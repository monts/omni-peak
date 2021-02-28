import { SetMetadata } from '@nestjs/common'
import { IRole } from 'src/modules/users/enums/Role'

export const Roles = (...roles: IRole[]) => SetMetadata('roles', roles)
