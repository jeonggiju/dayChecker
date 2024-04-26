import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudyService } from './study.service';
import { CreateStudyInput } from './dto/create-study.input';
import { Study } from './entities/study.entity';
import { Smoking } from 'api/smoking/entities/smoking.entity';
import { UpdateStudyInput } from './dto/update-study.input';

@Resolver()
export class StudyResolver {
  constructor(private readonly studyService: StudyService) {}

  @Mutation(() => Study)
  createStudy(
    @Args('createStudyInput') createStudyInput: CreateStudyInput,
  ): Promise<Study> {
    return this.studyService.create({ createStudyInput });
  }

  @Mutation(() => Study)
  removeStudy(@Args('studyId') studyId: string): Promise<Study> {
    return this.studyService.remove({ studyId });
  }

  @Query(() => Study)
  fetchStudy(@Args('studyId') studyId: string): Promise<Study> {
    return this.studyService.findOne({ studyId });
  }

  @Query(() => [Study])
  fetchStudies(): Promise<Smoking[]> {
    return this.studyService.findAll();
  }

  @Mutation(() => Study)
  updateStudy(
    @Args('studyId') studyId: string,
    @Args('updateStudyInput') updateStudyInput: UpdateStudyInput,
  ): Promise<Study> {
    return this.studyService.update({ studyId, updateStudyInput });
  }

  @Mutation(() => Boolean)
  restoreStudy(@Args('studyId') studyId: string): Promise<boolean> {
    return this.studyService.restore({ studyId });
  }

  @Query(() => [Study])
  fetchStudyWithDeleted(): Promise<Study[]> {
    return this.studyService.findAllWithDeleted();
  }
}
