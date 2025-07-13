import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from '../update-post.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async execute({ postId, title, content }: UpdatePostCommand): Promise<Post> {
    const post = await this.postRepo.findOneBy({ id: postId });
    if (!post) throw new Error('Post not found');

    if (title) post.title = title;
    if (content) post.content = content;

    return await this.postRepo.save(post);
  }
}
