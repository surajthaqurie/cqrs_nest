import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Comment } from './entities/comment.entity';
import { CommentController } from './comment.controller';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';
import { CreateCommentHandler, UpdateCommentHandler, DeleteCommentHandler } from './cqrs/command/handlers';
import { GetCommentHandler, ListCommentsHandler } from './cqrs/queries/handlers';
import { CommentCreatedHandler } from './events/handlers';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CqrsModule, UserModule, PostModule],
  controllers: [CommentController],
  providers: [CreateCommentHandler, UpdateCommentHandler, DeleteCommentHandler, CommentCreatedHandler, GetCommentHandler, ListCommentsHandler],
})
export class CommentModule {}
