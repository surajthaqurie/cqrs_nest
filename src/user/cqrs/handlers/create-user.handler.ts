import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserCommand } from '../command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async execute({ username, email, password }: CreateUserCommand): Promise<User> {
    const exists = await this.repo.findOne({ where: [{ email }, { username }] });
    if (exists) throw new Error('Username or email already exists');

    const hashed = await bcrypt.hash(password, 10);

    let userCode: string;
    do {
      userCode = this.generateCode();
    } while (await this.repo.findOne({ where: { userCode } }));

    const user = this.repo.create({ username, email, password: hashed, userCode });
    return await this.repo.save(user);
  }

  private generateCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}
