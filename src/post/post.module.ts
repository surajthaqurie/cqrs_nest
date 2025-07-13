import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { PostController } from './post.controller';
import { CreatePostHandler, UpdatePostHandler, DeletePostHandler } from './cqrs/command/handlers';
import { GetPostHandler, ListPostsHandler } from './cqrs/queries/handlers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CqrsModule, UserModule],
  controllers: [PostController],
  providers: [CreatePostHandler, UpdatePostHandler, DeletePostHandler, GetPostHandler, ListPostsHandler],
})
export class PostModule {}
