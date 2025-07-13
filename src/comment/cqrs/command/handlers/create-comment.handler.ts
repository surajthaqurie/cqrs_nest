import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommentCommand } from '../create-comment.command';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { Comment } from 'src/comment/entities/comment.entity';
import { CommentAggregate } from '../../aggregate/comment.aggregate';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute(command: CreateCommentCommand): Promise<Comment> {
    const { userId, postId, content } = command;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userService.getById(userId);
      const post = await this.postService.getById(postId);

      const comment = queryRunner.manager.create(Comment, { content, user, post });
      const saved = await queryRunner.manager.save(Comment, comment);

      const aggregate = new CommentAggregate(saved.id, user.id, post.id, content);
      aggregate.create();
      aggregate.commit();

      await queryRunner.commitTransaction();
      return saved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
