import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCommentQuery } from '../get-comment.query';
import { Comment } from 'src/comment/entities/comment.entity';

@QueryHandler(GetCommentQuery)
export class GetCommentHandler implements IQueryHandler<GetCommentQuery> {
  constructor(@InjectRepository(Comment) private readonly repo: Repository<Comment>) {}

  async execute(query: GetCommentQuery): Promise<Comment | null> {
    return this.repo.findOneBy({ id: query.commentId });
  }
}
