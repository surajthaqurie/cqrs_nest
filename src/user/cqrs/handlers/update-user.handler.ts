import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserCommand } from '../command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async execute({ id, username, email, password }: UpdateUserCommand): Promise<User> {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new Error('User not found');

    if (email && email !== user.email) {
      const emailTaken = await this.repo.findOneBy({ email });
      if (emailTaken) throw new Error('Email already used');
      user.email = email;
    }

    if (username && username !== user.username) {
      const usernameTaken = await this.repo.findOneBy({ username });
      if (usernameTaken) throw new Error('Username already used');
      user.username = username;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    return await this.repo.save(user);
  }
}
