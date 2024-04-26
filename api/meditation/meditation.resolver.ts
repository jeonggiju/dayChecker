import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MeditationService } from './meditation.service';
import { Meditation } from './entities/meditation.entity';
import { CreateMeditationInput } from './dto/create-meditation.input';
import { UpdateMeditationInput } from './dto/update-meditation.input';

@Resolver()
export class MeditationResolver {
  constructor(private readonly meditationService: MeditationService) {}

  @Mutation(() => Meditation)
  createMeditation(
    @Args('createMeditationInput') createMeditationInput: CreateMeditationInput,
  ): Promise<Meditation> {
    return this.meditationService.create({ createMeditationInput });
  }

  @Mutation(() => Meditation)
  removeMeditation(
    @Args('meditationId') meditationId: string,
  ): Promise<Meditation> {
    return this.meditationService.remove({ meditationId });
  }

  @Query(() => Meditation)
  fetchMeditation(
    @Args('meditationId') meditationId: string,
  ): Promise<Meditation> {
    return this.meditationService.findOne({ meditationId });
  }

  @Query(() => [Meditation])
  fetchMeditations(): Promise<Meditation[]> {
    return this.meditationService.findAll();
  }

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
  @Mutation(() => Boolean)
  restoreMeditation(
    @Args('meditationId') meditationId: string,
  ): Promise<boolean> {
    return this.meditationService.restore({ meditationId });
  }

  @Query(() => [Meditation])
  fetchMeditationsWithDeleted(): Promise<Meditation[]> {
    return this.meditationService.findAllWithDeleted();
  }
}
