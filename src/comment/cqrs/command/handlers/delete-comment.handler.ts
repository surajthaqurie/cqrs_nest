import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommentCommand } from '../delete-comment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler implements ICommandHandler<DeleteCommentCommand> {
  constructor(@InjectRepository(Comment) private readonly commentRepo: Repository<Comment>) {}

  async execute(command: DeleteCommentCommand): Promise<void> {
    const { commentId } = command;
    const comment = await this.commentRepo.findOneBy({ id: commentId });
    if (!comment) throw new Error('Comment not found');

    await this.commentRepo.remove(comment);
  }
}
