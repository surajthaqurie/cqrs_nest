import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCommentCommand } from '../update-comment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler implements ICommandHandler<UpdateCommentCommand> {
  constructor(@InjectRepository(Comment) private readonly commentRepo: Repository<Comment>) {}

  async execute(command: UpdateCommentCommand): Promise<Comment> {
    const { commentId, content } = command;
    const comment = await this.commentRepo.findOneBy({ id: commentId });
    if (!comment) throw new Error('Comment not found');

    comment.content = content;
    return this.commentRepo.save(comment);
  }
}
