import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BodyService } from './body.service';
import { CreateBodyInput } from './dto/create-body.input';
import { Body } from './entities/body.entity';
import { UpdateBodyInput } from './dto/update-body.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'api/auth/guards/gql-auth.guard';
import { IContext } from 'api/common/interfaces/common';

@Resolver()
export class BodyResolver {
  constructor(private readonly bodyService: BodyService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Body)
  createBody(
    @Context() context: IContext,
    @Args('createBodyInput') createBodyInput: CreateBodyInput,
  ): Promise<Body> {
    return this.bodyService.create({
      userId: context.req.user.id,
      createBodyInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Body)
  removeBody(@Args('bodyId') bodyId: string): Promise<Body> {
    return this.bodyService.remove({ bodyId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Body])
  fetchBodiesByUser(@Context() context: IContext): Promise<Body[]> {
    return this.bodyService.findAllByUser({ userId: context.req.user.id });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => Body)
  fetchBodyById(@Args('bodyId') bodyId: string): Promise<Body> {
    return this.bodyService.findOneById({ bodyId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Body)
  updateBody(
    @Args('bodyId') bodyId: string,
    @Args('updateBodyInput') updateBodyInput: UpdateBodyInput,
  ): Promise<Body> {
    return this.bodyService.update({ bodyId, updateBodyInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  restoreBody(@Args('bodyId') bodyId: string): Promise<boolean> {
    return this.bodyService.restore({ bodyId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Body])
  fetchBodiesWithRemoved(@Context() context: IContext): Promise<Body[]> {
    return this.bodyService.findAllWithRemoved({ userId: context.req.user.id });
  }
}
