import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';

// Handlers
import { CreateUserHandler } from './cqrs/handlers/create-user.handler';
import { UpdateUserHandler } from './cqrs/handlers/update-user.handler';
import { DeleteUserHandler } from './cqrs/handlers/delete-user.handler';
import { GetUserHandler } from './cqrs/handlers/get-user.handler';
import { ListUsersHandler } from './cqrs/handlers/list-users.handler';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UserController],
  providers: [CreateUserHandler, UpdateUserHandler, DeleteUserHandler, GetUserHandler, ListUsersHandler, UserService],
  exports: [UserService],
})
export class UserModule {}
