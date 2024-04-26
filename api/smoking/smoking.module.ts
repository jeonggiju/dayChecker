import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Smoking } from './entities/smoking.entity';
import { SmokingResolver } from './smoking.resolver';
import { SmokingService } from './smoking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Smoking])],
  providers: [SmokingResolver, SmokingService],
})
export class SmokingModule {}
