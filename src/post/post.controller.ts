import { Controller, Post, Body, Param, Get, Put, Delete, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './cqrs/command/create-post.command';
import { DeletePostCommand } from './cqrs/command/delete-post.command';
import { UpdatePostCommand } from './cqrs/command/update-post.command';
import { GetPostQuery } from './cqrs/queries/get-post.query';
import { ListPostsQuery } from './cqrs/queries/list-posts.query';

@Controller('posts')
export class PostController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: { userId: number; title: string; content: string }) {
    const { userId, title, content } = dto;
    return this.commandBus.execute(new CreatePostCommand(userId, title, content));
  }

  @Get()
  listFiltered(@Query() query: { userId?: number; title?: string }) {
    return this.queryBus.execute(new ListPostsQuery(query.userId ? +query.userId : undefined, query.title || undefined));
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.queryBus.execute(new GetPostQuery(+id));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: { title?: string; content?: string }) {
    return this.commandBus.execute(new UpdatePostCommand(+id, dto.title, dto.content));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commandBus.execute(new DeletePostCommand(+id));
  }
}
