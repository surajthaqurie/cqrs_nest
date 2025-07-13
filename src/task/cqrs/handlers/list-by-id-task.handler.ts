import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';
import { ListByIdTaskQuery } from '../queries';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(ListByIdTaskQuery)
export class ListByIdTaskHandler implements IQueryHandler<ListByIdTaskQuery> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  execute(query: ListByIdTaskQuery): Promise<Task | null> {
    const { id } = query;
    return this.taskRepository.findOneBy({ id });
  }
}
