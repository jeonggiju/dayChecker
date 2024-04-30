import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Study } from './entities/study.entity';
import {
  IStudyServiceCreate,
  IStudyServiceFindOne,
  IStudyServiceFindUsersAll,
  IStudyServiceRemove,
  IStudyServiceRestore,
  IStudyServiceUpdate,
} from './interfaces/study-service.interface';
import { UserService } from 'api/user/user.service';

export interface IStudyFindAllWithDeleted {
  userId: string;
}

@Injectable()
export class StudyService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Study)
    private readonly studyRepository: Repository<Study>,
  ) {}

  async findOneById({ studyId }: IStudyServiceFindOne): Promise<Study> {
    const result = await this.studyRepository.findOne({
      where: { id: studyId },
      relations: ['user'],
    });
    return result;
  }

  async findAllByUser({ userId }: IStudyServiceFindUsersAll): Promise<Study[]> {
    const user = await this.userService.findOne({ userId });
    console.log(user);
    const result = await this.studyRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return result;
  }

  async create({
    userId,
    createStudyInput,
  }: IStudyServiceCreate): Promise<Study> {
    const result = this.studyRepository.create({
      ...createStudyInput,
      user: {
        id: userId,
      },
    });

    return await this.studyRepository.save(result);
  }

  async remove({ studyId }: IStudyServiceRemove): Promise<Study> {
    const study = await this.findOneById({ studyId });
    const result = await this.studyRepository.softRemove(study);
    return result;
  }

  async update({ studyId, updateStudyInput }: IStudyServiceUpdate) {
    const prevData = await this.findOneById({ studyId });
    const studyData = this.studyRepository.create({
      ...prevData,
      ...updateStudyInput,
    });

    return await this.studyRepository.save(studyData);
  }

  async restore({ studyId }: IStudyServiceRestore): Promise<boolean> {
    const data = await this.studyRepository.restore({ id: studyId });
    console.log(data);
    return data.affected ? true : false;
  }

  async findAllWithDeleted({
    userId,
  }: IStudyFindAllWithDeleted): Promise<Study[]> {
    const user = await this.userService.findOne({ userId });
    const result = await this.studyRepository.find({
      where: {
        user: user,
      },
      withDeleted: true,
      relations: ['user'],
    });
    return result;
  }
}
