import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { PrismaService } from '../prisma.service'

export async function seedUsers(prisma: PrismaService) {
  const users: User[] = [
    {
      id: 'c5aa4c1d-742f-49c8-b1e1-21b2b757ce28',
      name: 'Admin',
      email: 'admin@omni-peak.monts.br',
      role: 'ADMIN',
      password: await hash('123123123', 8),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  return Promise.all(
    users.map(async data => {
      const userExists = await prisma.user.findUnique({
        where: { id: data.id },
      })

      if (!userExists) {
        await prisma.user.create({ data })
      }
    })
  )
}
