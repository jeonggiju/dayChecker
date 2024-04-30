import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SmokingService } from './smoking.service';
import { Smoking } from './entities/smoking.entity';
import { CreateSmokingInput } from './dto/create-smoking.input';
import { UpdateSmokingInput } from './dto/update-smoking.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'api/auth/guards/gql-auth.guard';
import { IContext } from 'api/common/interfaces/common';

@Resolver()
export class SmokingResolver {
  constructor(private readonly smokingService: SmokingService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Smoking)
  createSmoking(
    @Context() context: IContext,
    @Args('createSmokingInput') createSmokingInput: CreateSmokingInput,
  ): Promise<Smoking> {
    return this.smokingService.create({
      userId: context.req.user.id,
      createSmokingInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Smoking)
  removeSmoking(@Args('smokingId') smokingId: string): Promise<Smoking> {
    return this.smokingService.remove({ smokingId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => Smoking)
  fetchSmokingById(@Args('smokingId') smokingId: string): Promise<Smoking> {
    return this.smokingService.findOneById({ smokingId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Smoking])
  fetchSmokingsByUser(@Context() context: IContext): Promise<Smoking[]> {
    return this.smokingService.findAllByUser({ userId: context.req.user.id });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Smoking)
  updateSmoking(
    @Args('smokingId') smokingId: string,
    @Args('updateSmokingInput') updateSmokingInput: UpdateSmokingInput,
  ): Promise<Smoking> {
    return this.smokingService.update({ smokingId, updateSmokingInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  restoreSmoking(@Args('smokingId') smokingId: string): Promise<boolean> {
    return this.smokingService.restore({ smokingId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Smoking])
  fetchSmokingsWithDeleted(@Context() context: IContext): Promise<Smoking[]> {
    return this.smokingService.findAllWithDeleted({
      userId: context.req.user.id,
    });
  }
}
