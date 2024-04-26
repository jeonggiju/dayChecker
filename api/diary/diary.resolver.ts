import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DiaryService } from './diary.service';
import { Diary } from './entities/diary.entity';
import { CreateDiaryInput } from './dto/create-diary.input';
import { UpdateDiaryInput } from './dto/update-diary.input';

@Resolver()
export class DiaryResolver {
  constructor(private readonly diaryService: DiaryService) {}

  @Mutation(() => Diary)
  createDiary(
    @Args('createDiaryInput') createDiaryInput: CreateDiaryInput,
  ): Promise<Diary> {
    return this.diaryService.create({ createDiaryInput });
  }

  @Mutation(() => Diary)
  removeDiary(@Args('diaryId') diaryId: string): Promise<Diary> {
    return this.diaryService.remove({ diaryId });
  }

  @Query(() => Diary)
  fetchDiary(@Args('diaryId') diaryId: string): Promise<Diary> {
    return this.diaryService.findOne({ diaryId });
  }

  @Query(() => [Diary])
  fetchDiaries(): Promise<Diary[]> {
    return this.diaryService.findAll();
  }

  @Mutation(() => Diary)
  updateDiary(
    @Args('diaryId') diaryId: string,
    @Args('updateDiaryInput') updateDiaryInput: UpdateDiaryInput,
  ): Promise<Diary> {
    return this.diaryService.update({ diaryId, updateDiaryInput });
  }

  @Mutation(() => Boolean)
  restoreDiary(@Args('diaryId') diaryId: string): Promise<boolean> {
    return this.diaryService.restore({ diaryId });
  }
  @Query(() => [Diary])
  fetchDiariesWithDeleted(): Promise<Diary[]> {
    return this.diaryService.findAllWithDeleted();
  }
}
