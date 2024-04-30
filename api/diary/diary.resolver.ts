import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DiaryService } from './diary.service';
import { Diary } from './entities/diary.entity';
import { CreateDiaryInput } from './dto/create-diary.input';
import { UpdateDiaryInput } from './dto/update-diary.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'api/auth/guards/gql-auth.guard';
import { IContext } from 'api/common/interfaces/common';

@Resolver()
export class DiaryResolver {
  constructor(private readonly diaryService: DiaryService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Diary)
  createDiary(
    @Context() context: IContext,
    @Args('createDiaryInput') createDiaryInput: CreateDiaryInput,
  ): Promise<Diary> {
    return this.diaryService.create({
      userId: context.req.user.id,
      createDiaryInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Diary)
  removeDiary(@Args('diaryId') diaryId: string): Promise<Diary> {
    return this.diaryService.remove({ diaryId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => Diary)
  fetchDiaryById(@Args('diaryId') diaryId: string): Promise<Diary> {
    return this.diaryService.findOneById({ diaryId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Diary])
  fetchDiariesByUser(@Context() context: IContext): Promise<Diary[]> {
    return this.diaryService.findAllByUser({ userId: context.req.user.id });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Diary)
  updateDiary(
    @Args('diaryId') diaryId: string,
    @Args('updateDiaryInput') updateDiaryInput: UpdateDiaryInput,
  ): Promise<Diary> {
    return this.diaryService.update({ diaryId, updateDiaryInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  restoreDiary(@Args('diaryId') diaryId: string): Promise<boolean> {
    return this.diaryService.restore({ diaryId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Diary])
  fetchDiariesWithDeleted(@Context() context: IContext): Promise<Diary[]> {
    return this.diaryService.findAllWithDeleted({
      userId: context.req.user.id,
    });
  }
}
