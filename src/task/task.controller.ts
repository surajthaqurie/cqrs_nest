import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand, UpdateByCompletedCommand, DeleteTaskCommand } from './cqrs/command';
import { ListTaskQuery, ListByIdTaskQuery } from './cqrs/queries';

@Controller('task')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body('description') description: string) {
    return this.commandBus.execute(new CreateTaskCommand(description));
  }

  @Get()
  async find() {
    return this.queryBus.execute(new ListTaskQuery());
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.queryBus.execute(new ListByIdTaskQuery(id));
  }

  @Patch(':id/completed/:completed')
  async updateByCompleted(@Param('id') id: number, @Param('completed') completed: boolean) {
    return this.commandBus.execute(new UpdateByCompletedCommand(id, completed));
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteTaskCommand(id));
  }
}
