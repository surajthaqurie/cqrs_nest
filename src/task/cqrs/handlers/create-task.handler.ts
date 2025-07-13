import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from '../command';
import { Repository } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  execute(command: CreateTaskCommand): Promise<Task> {
    const { description } = command;
    return this.taskRepository.save({ description });
  }
}
