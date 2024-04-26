import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  IExerciseServiceCreate,
  IExerciseServiceFindOne,
  IExerciseServiceRemove,
  IExerciseServiceRestore,
  IExerciseServiceUpdate,
} from './interfaces/exercise-service.interface';
import { Exercise } from './entities/exercise.entity';
import { ExercisePartService } from 'api/exercise-part/exercise-part.service';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    private readonly exercisePartService: ExercisePartService,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Exercise[]> {
    const result = await this.exerciseRepository.find({
      relations: ['user', 'exerciseParts'],
    });
    return result;
  }

  async findOne({ exerciseId }: IExerciseServiceFindOne): Promise<Exercise> {
    const result = await this.exerciseRepository.findOne({
      where: { id: exerciseId },
      relations: ['user', 'exerciseParts'],
    });
    return result;
  }

  async create({
    createExerciseInput,
  }: IExerciseServiceCreate): Promise<Exercise> {
    const { userId, exerciseParts, ...exercise } = createExerciseInput;

    // exercisePart 등록
    const partNames = exerciseParts.map((el) => el.replace('#', ''));
    const prevNames = await this.exercisePartService.findByNames({
      exercisePartNames: partNames,
    });
    const temp = [];

    partNames.forEach((el) => {
      const isExists = prevNames.find((prevEl) => el === prevEl.name);
      if (!isExists) temp.push({ name: el });
    });

    const newParts = await this.exercisePartService.bulkInsert({
      names: temp,
    });
    const parts = [...newParts.identifiers, ...prevNames];
    const result = this.exerciseRepository.create({
      ...exercise,
      user: {
        id: userId,
      },
      exerciseParts: parts,
    });

    await this.exerciseRepository.save(result);
    return result;
  }

  async remove({ exerciseId }: IExerciseServiceRemove): Promise<Exercise> {
    const exercise = await this.findOne({ exerciseId });
    const result = await this.exerciseRepository.softRemove(exercise);
    return result;
  }

  async update({
    exerciseId,
    updateExerciseInput,
  }: IExerciseServiceUpdate): Promise<Exercise> {
    const prevData = await this.findOne({ exerciseId });
    const exerciseData = await this.exerciseRepository.create({
      ...prevData,
      ...updateExerciseInput,
    });

    return await this.exerciseRepository.save(exerciseData);
  }

  async restore({ exerciseId }: IExerciseServiceRestore): Promise<boolean> {
    const data = await this.exerciseRepository.restore({ id: exerciseId });
    console.log(data);
    return data.affected ? true : false;
  }

  async findAllWithDeleted(): Promise<Exercise[]> {
    return await this.exerciseRepository.find({
      withDeleted: true,
      relations: ['user', 'exerciseParts'],
    });
  }
}
