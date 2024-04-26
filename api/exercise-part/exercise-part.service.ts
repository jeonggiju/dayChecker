import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExercisePart } from './entities/exercise-part.entity';

export interface IExercisePartFindByName {
  exercisePartNames: string[];
}

export interface IExercisePartServiceBulkInsert {
  names: {
    name: string;
  }[];
}

@Injectable()
export class ExercisePartService {
  constructor(
    @InjectRepository(ExercisePart)
    private readonly exercisePartRepository: Repository<ExercisePart>,
  ) {}

  async findByNames({
    exercisePartNames,
  }: IExercisePartFindByName): Promise<ExercisePart[]> {
    const result = await this.exercisePartRepository.find({
      where: { name: In(exercisePartNames) },
    });

    return result;
  }

  async bulkInsert({ names }: IExercisePartServiceBulkInsert) {
    return await this.exercisePartRepository.insert(names);
  }
}
