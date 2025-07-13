import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DATABASE_HOST_ADDRESS'),
        port: parseInt(configService.getOrThrow('DATABASE_PORT'), 10),
        database: configService.getOrThrow('POSTGRES_DB'),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        synchronize: true,
        logging: true,
        entities: [__dirname + '/task/entities/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),

    TaskModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
