import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../create-post.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { UserService } from 'src/user/user.service';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  async execute(command: CreatePostCommand): Promise<Post> {
    const { userId, title, content } = command;

    const user = await this.userService.getById(userId);
    if (!user) throw new Error('User not found');

    const post = this.postRepo.create({ title, content, user });
    return await this.postRepo.save(post);
  }
}
