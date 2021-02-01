import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './models/user.entity';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
