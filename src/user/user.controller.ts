import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand, UpdateUserCommand, DeleteUserCommand } from './cqrs/command';
import { ListUsersQuery, GetUserQuery } from './cqrs/queries';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: { username: string; email: string; password: string }) {
    const { username, email, password } = dto;
    return this.commandBus.execute(new CreateUserCommand(username, email, password));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new ListUsersQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.queryBus.execute(new GetUserQuery(+id));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: { username?: string; email?: string; password?: string }) {
    return this.commandBus.execute(new UpdateUserCommand(+id, dto.username, dto.email, dto.password));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteUserCommand(+id));
  }
}
