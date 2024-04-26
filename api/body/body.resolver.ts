import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BodyService } from './body.service';
import { CreateBodyInput } from './dto/create-body.input';
import { Body } from './entities/body.entity';
import { UpdateBodyInput } from './dto/update-body.input';

@Resolver()
export class BodyResolver {
  constructor(private readonly bodyService: BodyService) {}

  @Mutation(() => Body)
  createBody(
    @Args('createBodyInput') createBodyInput: CreateBodyInput,
  ): Promise<Body> {
    return this.bodyService.create({ createBodyInput });
  }

  @Mutation(() => Body)
  removeBody(@Args('bodyId') bodyId: string): Promise<Body> {
    return this.bodyService.remove({ bodyId });
  }

  @Query(() => [Body])
  fetchBodies(): Promise<Body[]> {
    return this.bodyService.findAll();
  }

  @Query(() => Body)
  fetchBody(@Args('bodyId') bodyId: string): Promise<Body> {
    return this.bodyService.findOne({ bodyId });
  }

  @Mutation(() => Body)
  updateBody(
    @Args('bodyId') bodyId: string,
    @Args('updateBodyInput') updateBodyInput: UpdateBodyInput,
  ): Promise<Body> {
    return this.bodyService.update({ bodyId, updateBodyInput });
  }

  @Query(() => [Body])
  fetchProductsWithRemoved(): Promise<Body[]> {
    return this.bodyService.findAllWithRemoved();
  }

  @Mutation(() => Boolean)
  restoreBody(@Args('bodyId') bodyId: string): Promise<boolean> {
    return this.bodyService.restore({ bodyId });
  }

  @Query(() => [Body])
  fetchBodiesWithDeleted(): Promise<Body[]> {
    return this.bodyService.findAllWithDeleted();
  }
}
