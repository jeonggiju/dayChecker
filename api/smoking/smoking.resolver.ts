import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SmokingService } from './smoking.service';
import { Smoking } from './entities/smoking.entity';
import { CreateSmokingInput } from './dto/create-smoking.input';
import { UpdateSmokingInput } from './dto/update-smoking.input';

@Resolver()
export class SmokingResolver {
  constructor(private readonly smokingService: SmokingService) {}

  @Mutation(() => Smoking)
  createSmoking(
    @Args('createSmokingInput') createSmokingInput: CreateSmokingInput,
  ): Promise<Smoking> {
    return this.smokingService.create({ createSmokingInput });
  }

  @Mutation(() => Smoking)
  removeSmoking(@Args('smokingId') smokingId: string): Promise<Smoking> {
    return this.smokingService.remove({ smokingId });
  }

  @Query(() => Smoking)
  fetchSmoking(@Args('smokingId') smokingId: string): Promise<Smoking> {
    return this.smokingService.findOne({ smokingId });
  }

  @Query(() => [Smoking])
  fetchSmokings(): Promise<Smoking[]> {
    return this.smokingService.findAll();
  }

  @Mutation(() => Smoking)
  updateSmoking(
    @Args('smokingId') smokingId: string,
    @Args('updateSmokingInput') updateSmokingInput: UpdateSmokingInput,
  ): Promise<Smoking> {
    return this.smokingService.update({ smokingId, updateSmokingInput });
  }

  @Mutation(() => Boolean)
  restoreSmoking(@Args('smokingId') smokingId: string): Promise<boolean> {
    return this.smokingService.restore({ smokingId });
  }

  @Query(() => [Smoking])
  fetchSmokingsWithDeleted(): Promise<Smoking[]> {
    return this.smokingService.findAllWithDeleted();
  }
}
