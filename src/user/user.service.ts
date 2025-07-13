import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getById(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new Error('User not found');
    return user;
  }
}
