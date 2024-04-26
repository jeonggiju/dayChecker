import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create({ createUserInput });
  }

  @Mutation(() => User)
  removeUser(@Args('userId') userId: string): Promise<User> {
    return this.userService.remove({ userId });
  }

  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  fetchUser(@Args('userId') userId: string): Promise<User> {
    return this.userService.findOne({ userId });
  }

  @Mutation(() => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update({ userId, updateUserInput });
  }

  @Mutation(() => Boolean)
  restoreUser(@Args('userId') userId: string): Promise<boolean> {
    return this.userService.restore({ userId });
  }
  @Query(() => [User])
  fetchUsersWithDeleted(): Promise<User[]> {
    return this.userService.findAllWithDeleted();
  }
}
