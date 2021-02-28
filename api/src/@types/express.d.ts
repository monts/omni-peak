/* eslint-disable @typescript-eslint/naming-convention */
import 'express'
import { IRole } from 'src/modules/users/enums/Role'

declare module 'express' {
  export interface IRequestUser {
    id: string
    role: IRole
  }

  interface Request {
    user: IRequestUser
  }
}
