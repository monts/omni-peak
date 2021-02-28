import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { CreatePostDto } from './dtos/create-post.dto'
import { UpdatePostDto } from './dtos/update-post.dto'
import { PostsRepository } from './repositories/posts.repository'

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto, userId: string) {
    try {
      const post = await this.postsRepository.create(createPostDto, userId)

      return post
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async findAll() {
    const posts = await this.postsRepository.findAll()

    return posts
  }

  async findOne(idOrSlug: string) {
    const post = await this.postsRepository.findByIdOrSlug(idOrSlug)
    console.log(post)

    if (!post) {
      throw new NotFoundException()
    }

    return post
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findByIdOrSlug(id)

    if (!post) {
      throw new NotFoundException()
    }

    try {
      const updatedPost = await this.postsRepository.update(id, updatePostDto)

      return updatedPost
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: string) {
    const post = await this.postsRepository.findByIdOrSlug(id)

    if (!post) {
      throw new NotFoundException()
    }

    try {
      await this.postsRepository.delete(id)
    } catch {
      throw new InternalServerErrorException()
    }
  }
}
