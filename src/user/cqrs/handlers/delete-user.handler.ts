import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { DeleteUserCommand } from '../command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    await this.repo.delete(command.id);
  }
}
