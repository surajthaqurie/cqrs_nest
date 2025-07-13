import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from '../delete-post.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async execute(command: DeletePostCommand): Promise<void> {
    await this.postRepo.delete(command.postId);
  }
}
