import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExerciseService } from './exercise.service';
import { Exercise } from './entities/exercise.entity';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { UpdateExerciseInput } from './dto/update-exercise.input';

@Resolver()
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Mutation(() => Exercise)
  createExercise(
    @Args('createExerciseInput') createExerciseInput: CreateExerciseInput,
  ): Promise<Exercise> {
    return this.exerciseService.create({ createExerciseInput });
  }

  @Mutation(() => Exercise)
  removeExercise(@Args('exerciseId') exerciseId: string): Promise<Exercise> {
    return this.exerciseService.remove({ exerciseId });
  }

  @Query(() => [Exercise])
  fetchExercises(): Promise<Exercise[]> {
    return this.exerciseService.findAll();
  }

  @Query(() => Exercise)
  fetchExercise(@Args('exerciseId') exerciseId: string): Promise<Exercise> {
    return this.exerciseService.findOne({ exerciseId });
  }

  @Mutation(() => Exercise)
  updateExercise(
    @Args('exerciseId') exerciseId: string,
    @Args('updateExerciseInput') updateExerciseInput: UpdateExerciseInput,
  ): Promise<Exercise> {
    return this.exerciseService.update({ exerciseId, updateExerciseInput });
  }

  @Mutation(() => Boolean)
  restoreExercise(@Args('exerciseId') exerciseId: string): Promise<boolean> {
    return this.exerciseService.restore({ exerciseId });
  }

  @Query(() => [Exercise])
  fetchExercisesWithDeleted(): Promise<Exercise[]> {
    return this.exerciseService.findAllWithDeleted();
  }
}
