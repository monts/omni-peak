import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'

import { CreatePostDto } from '../dtos/create-post.dto'
import { UpdatePostDto } from '../dtos/update-post.dto'
import { Post } from '../entities/post.entity'

@Injectable()
export class PostsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto, userId: string): Promise<Post> {
    const post = await this.prisma.post.create({
      data: { ...data, user: { connect: { id: userId } } },
    })

    return post
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany()

    return posts
  }

  async findByIdOrSlug(idOrSlug: string): Promise<Post | null> {
    const post = await this.prisma.post.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    })

    return post
  }

  async update(id: string, data: UpdatePostDto): Promise<Post> {
    const post = await this.prisma.post.update({ data, where: { id } })

    return post
  }

  async delete(id: string): Promise<void> {
    await this.prisma.post.delete({ where: { id } })
  }
}
