import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HobbyService } from 'api/hobby/hobby.service';
import { Hobby } from 'api/hobby/entities/hobby.entity';
import { TransactionService } from 'api/common/transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Hobby])],
  providers: [UserResolver, UserService, HobbyService, TransactionService],
})
export class UserModule {}
