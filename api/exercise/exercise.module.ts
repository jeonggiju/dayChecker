import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseResolver } from './exercise.resolver';
import { ExerciseService } from './exercise.service';
import { Exercise } from './entities/exercise.entity';
import { ExercisePartService } from 'api/exercise-part/exercise-part.service';
import { ExercisePart } from 'api/exercise-part/entities/exercise-part.entity';
import { User } from 'api/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, ExercisePart, User])],
  providers: [ExerciseService, ExerciseResolver, ExercisePartService],
})
export class ExerciseModule {}
