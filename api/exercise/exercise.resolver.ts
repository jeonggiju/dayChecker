import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExerciseService } from './exercise.service';
import { Exercise } from './entities/exercise.entity';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { UpdateExerciseInput } from './dto/update-exercise.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'api/auth/guards/gql-auth.guard';
import { IContext } from 'api/common/interfaces/common';

@Resolver()
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Exercise)
  createExercise(
    @Context() context: IContext,
    @Args('createExerciseInput') createExerciseInput: CreateExerciseInput,
  ): Promise<Exercise> {
    return this.exerciseService.create({
      userId: context.req.user.id,
      createExerciseInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Exercise)
  removeExercise(@Args('exerciseId') exerciseId: string): Promise<Exercise> {
    return this.exerciseService.remove({ exerciseId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Exercise])
  fetchExercisesByUser(@Context() context: IContext): Promise<Exercise[]> {
    return this.exerciseService.findAllByUser({ userId: context.req.user.id });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => Exercise)
  fetchExerciseById(@Args('exerciseId') exerciseId: string): Promise<Exercise> {
    return this.exerciseService.findOneById({ exerciseId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Exercise)
  updateExercise(
    @Args('exerciseId') exerciseId: string,
    @Args('updateExerciseInput') updateExerciseInput: UpdateExerciseInput,
  ): Promise<Exercise> {
    return this.exerciseService.update({ exerciseId, updateExerciseInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  restoreExercise(@Args('exerciseId') exerciseId: string): Promise<boolean> {
    return this.exerciseService.restore({ exerciseId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Exercise])
  fetchExercisesWithDeleted(@Context() context: IContext): Promise<Exercise[]> {
    return this.exerciseService.findAllWithDeleted({
      userId: context.req.user.id,
    });
  }
}
