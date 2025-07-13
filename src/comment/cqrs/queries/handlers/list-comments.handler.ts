import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListCommentsQuery } from '../list-comments.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

@QueryHandler(ListCommentsQuery)
export class ListCommentsHandler implements IQueryHandler<ListCommentsQuery> {
  constructor(@InjectRepository(Comment) private readonly repo: Repository<Comment>) {}

  async execute(query: ListCommentsQuery): Promise<Comment[]> {
    return this.repo.find({ where: { post: { id: query.postId } } });
  }
}
