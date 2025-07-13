import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListPostsQuery } from '../list-posts.query';
import { Post } from 'src/post/entities/post.entity';

@QueryHandler(ListPostsQuery)
export class ListPostsHandler implements IQueryHandler<ListPostsQuery> {
  constructor(@InjectRepository(Post) private readonly postRepo: Repository<Post>) {}

  async execute(query: ListPostsQuery): Promise<Post[]> {
    const { userId, title } = query;

    const qb = this.postRepo.createQueryBuilder('post').leftJoinAndSelect('post.user', 'user');

    if (userId) qb.andWhere('post.userId = :userId', { userId });
    if (title) qb.andWhere('LOWER(post.title) LIKE LOWER(:title)', { title: `%${title}%` });

    return qb.getMany();
  }
}
