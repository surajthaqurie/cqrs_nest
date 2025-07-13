import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateCommentCommand } from './cqrs/command/create-comment.command';
import { DeleteCommentCommand } from './cqrs/command/delete-comment.command';
import { UpdateCommentCommand } from './cqrs/command/update-comment.command';
import { GetCommentQuery } from './cqrs/queries/get-comment.query';
import { ListCommentsQuery } from './cqrs/queries/list-comments.query';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() body: { userId: number; postId: number; content: string }) {
    return this.commandBus.execute(new CreateCommentCommand(body.userId, body.postId, body.content));
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.queryBus.execute(new GetCommentQuery(+id));
  }

  @Get('post/:postId')
  list(@Param('postId') postId: number) {
    return this.queryBus.execute(new ListCommentsQuery(+postId));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: { content: string }) {
    return this.commandBus.execute(new UpdateCommentCommand(+id, body.content));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteCommentCommand(+id));
  }
}
