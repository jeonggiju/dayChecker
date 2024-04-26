import { Module } from '@nestjs/common';
import { BodyResolver } from './body.resolver';
import { BodyService } from './body.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Body } from './entities/body.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Body])],
  providers: [BodyResolver, BodyService],
})
export class BodyModule {}
