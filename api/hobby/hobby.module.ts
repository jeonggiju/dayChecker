import { Module } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { HobbyResolver } from './hobby.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hobby } from './entities/hobby.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hobby])],

  providers: [HobbyResolver, HobbyService],
  exports: [HobbyService],
})
export class HobbyModule {}
