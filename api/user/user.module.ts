import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TransactionService } from 'api/common/transaction.service';
import { HobbyModule } from 'api/hobby/hobby.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HobbyModule],
  providers: [UserResolver, UserService, TransactionService],
  exports: [UserService],
})
export class UserModule {}
