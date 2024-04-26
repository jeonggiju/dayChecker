import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Study } from './entities/study.entity';
import {
  IStudyServiceCreate,
  IStudyServiceFindOne,
  IStudyServiceRemove,
  IStudyServiceRestore,
  IStudyServiceUpdate,
} from './interfaces/study-service.interface';

@Injectable()
export class StudyService {
  constructor(
    @InjectRepository(Study)
    private readonly studyRepository: Repository<Study>,
  ) {}

  async findOne({ studyId }: IStudyServiceFindOne): Promise<Study> {
    const result = await this.studyRepository.findOne({
      where: { id: studyId },
      relations: ['user'],
    });
    return result;
  }

  async findAll(): Promise<Study[]> {
    const result = await this.studyRepository.find({
      relations: ['user'],
    });
    return result;
  }

  async create({ createStudyInput }: IStudyServiceCreate): Promise<Study> {
    const { userId, ...study } = createStudyInput;

    const result = this.studyRepository.create({
      ...study,
      user: {
        id: userId,
      },
    });

    return await this.studyRepository.save(result);
  }

  async remove({ studyId }: IStudyServiceRemove): Promise<Study> {
    const study = await this.findOne({ studyId });
    const result = await this.studyRepository.softRemove(study);
    return result;
  }

  async update({ studyId, updateStudyInput }: IStudyServiceUpdate) {
    const prevData = await this.findOne({ studyId });
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

  async findAllWithDeleted(): Promise<Study[]> {
    return await this.studyRepository.find({
      withDeleted: true,
      relations: ['user'],
    });
  }
}
