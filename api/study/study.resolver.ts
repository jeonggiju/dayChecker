import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudyService } from './study.service';
import { CreateStudyInput } from './dto/create-study.input';
import { Study } from './entities/study.entity';
import { UpdateStudyInput } from './dto/update-study.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'api/auth/guards/gql-auth.guard';
import { IContext } from 'api/common/interfaces/common';

@Resolver()
export class StudyResolver {
  constructor(private readonly studyService: StudyService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Study)
  createStudy(
    @Context() context: IContext,
    @Args('createStudyInput') createStudyInput: CreateStudyInput,
  ): Promise<Study> {
    return this.studyService.create({
      userId: context.req.user.id,
      createStudyInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Study)
  removeStudy(@Args('studyId') studyId: string): Promise<Study> {
    return this.studyService.remove({ studyId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => Study)
  fetchStudyById(@Args('studyId') studyId: string): Promise<Study> {
    return this.studyService.findOneById({ studyId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Study])
  fetchStudiesByUser(@Context() context: IContext): Promise<Study[]> {
    return this.studyService.findAllByUser({ userId: context.req.user.id });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Study)
  updateStudy(
    @Args('studyId') studyId: string,
    @Args('updateStudyInput') updateStudyInput: UpdateStudyInput,
  ): Promise<Study> {
    return this.studyService.update({ studyId, updateStudyInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  restoreStudy(@Args('studyId') studyId: string): Promise<boolean> {
    return this.studyService.restore({ studyId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Study])
  fetchStudyWithDeleted(@Context() context: IContext): Promise<Study[]> {
    return this.studyService.findAllWithDeleted({
      userId: context.req.user.id,
    });
  }
}
