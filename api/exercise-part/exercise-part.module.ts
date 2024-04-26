import { Module } from '@nestjs/common';
import { ExercisePartService } from './exercise-part.service';
import { ExercisePartResolver } from './exercise-part.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisePart } from './entities/exercise-part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExercisePart])],

  providers: [ExercisePartResolver, ExercisePartService],
})
export class ExercisePartModule {}
