import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'api/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { IContext } from 'api/common/interfaces/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { description: 'shacking fucking ass~~' })
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create({ createUserInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => User)
  removeUser(@Context() context: IContext): Promise<User> {
    return this.userService.remove({ userId: context.req.user.id });
  }

  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => User)
  fetchUser(@Context() context: IContext): Promise<User> {
    return this.userService.findOne({ userId: context.req.user.id });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => User)
  updateUser(
    @Context() context: IContext,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update({
      userId: context.req.user.id,
      updateUserInput,
    });
  }

  @Mutation(() => Boolean)
  restoreUser(@Args('userEmail') userEmail: string): Promise<boolean> {
    return this.userService.restore({ userEmail });
  }

  @Query(() => [User])
  fetchUsersWithDeleted(): Promise<User[]> {
    return this.userService.findAllWithDeleted();
  }
}
