// src/post/post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async getById(id: number): Promise<Post> {
    const post = await this.postRepo.findOne({ where: { id }, relations: ['user'] });
    if (!post) throw new NotFoundException(`Post with id ${id} not found`);
    return post;
  }

  async create(title: string, content: string, user: User): Promise<Post> {
    const post = this.postRepo.create({ title, content, user });
    return this.postRepo.save(post);
  }

  async update(id: number, title?: string, content?: string): Promise<Post> {
    const post = await this.getById(id);
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    return this.postRepo.save(post);
  }

  async delete(id: number): Promise<void> {
    const post = await this.getById(id);
    await this.postRepo.remove(post);
  }

  async listByUser(userId: number): Promise<Post[]> {
    return this.postRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
