import { Module } from '@nestjs/common';
import { MeditationResolver } from './meditation.resolver';
import { MeditationService } from './meditation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meditation } from './entities/meditation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meditation])],
  providers: [MeditationResolver, MeditationService],
})
export class MeditationModule {}
