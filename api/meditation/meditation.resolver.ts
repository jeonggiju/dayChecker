import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MeditationService } from './meditation.service';
import { Meditation } from './entities/meditation.entity';
import { CreateMeditationInput } from './dto/create-meditation.input';
import { UpdateMeditationInput } from './dto/update-meditation.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'api/auth/guards/gql-auth.guard';
import { IContext } from 'api/common/interfaces/common';

@Resolver()
export class MeditationResolver {
  constructor(private readonly meditationService: MeditationService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Meditation)
  createMeditation(
    @Context() context: IContext,
    @Args('createMeditationInput') createMeditationInput: CreateMeditationInput,
  ): Promise<Meditation> {
    return this.meditationService.create({
      userId: context.req.user.id,
      createMeditationInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Meditation)
  removeMeditation(
    @Args('meditationId') meditationId: string,
  ): Promise<Meditation> {
    return this.meditationService.remove({ meditationId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => Meditation)
  fetchMeditationById(
    @Args('meditationId') meditationId: string,
  ): Promise<Meditation> {
    return this.meditationService.findOneById({ meditationId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Meditation])
  fetchMeditationsByUser(@Context() context: IContext): Promise<Meditation[]> {
    return this.meditationService.findAllByUser({
      userId: context.req.user.id,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Meditation)
  updateMeditation(
    @Args('meditationId') meditationId: string,
    @Args('updateMeditationInput') updateMeditationInput: UpdateMeditationInput,
  ): Promise<Meditation> {
    return this.meditationService.update({
      meditationId,
      updateMeditationInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  restoreMeditation(
    @Args('meditationId') meditationId: string,
  ): Promise<boolean> {
    return this.meditationService.restore({ meditationId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Meditation])
  fetchMeditationsWithDeleted(
    @Context() context: IContext,
  ): Promise<Meditation[]> {
    return this.meditationService.findAllWithDeletedByUser({
      userId: context.req.user.id,
    });
  }
}
