import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { Repository } from 'typeorm';
import { GetPostQuery } from '../get-post.query';

@QueryHandler(GetPostQuery)
export class GetPostHandler implements IQueryHandler<GetPostQuery> {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async execute(query: GetPostQuery): Promise<Post | null> {
    return await this.postRepo.findOne({
      where: { id: query.postId },
      relations: ['user'],
    });
  }
}
