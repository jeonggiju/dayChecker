import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entity';
import { Repository } from 'typeorm';
import {
  IDiaryServiceCreate,
  IDiaryServiceFindAllByUser,
  IDiaryServiceFindAllWithDeleted,
  IDiaryServiceFindOneById,
  IDiaryServiceRemove,
  IDiaryServiceRestore,
  IDiaryServiceUpdate,
} from './interfaces/diary-service.interface';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
  ) {}

  async findAllByUser({
    userId,
  }: IDiaryServiceFindAllByUser): Promise<Diary[]> {
    return await this.diaryRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });
  }

  async findOneById({ diaryId }: IDiaryServiceFindOneById): Promise<Diary> {
    const result = await this.diaryRepository.findOne({
      where: { id: diaryId },
      relations: ['user'],
    });
    return result;
  }

  async create({
    userId,
    createDiaryInput,
  }: IDiaryServiceCreate): Promise<Diary> {
    const result = await this.diaryRepository.create({
      ...createDiaryInput,
      user: {
        id: userId,
      },
    });

    await this.diaryRepository.save(result);
    return result;
  }

  async remove({ diaryId }: IDiaryServiceRemove): Promise<Diary> {
    const diary = await this.findOneById({ diaryId });
    const result = await this.diaryRepository.softRemove(diary);
    return result;
  }

  async update({
    diaryId,
    updateDiaryInput,
  }: IDiaryServiceUpdate): Promise<Diary> {
    const prevData = await this.findOneById({ diaryId });
    const bodyData = this.diaryRepository.create({
      ...prevData,
      ...updateDiaryInput,
    });

    return await this.diaryRepository.save(bodyData);
  }

  async restore({ diaryId }: IDiaryServiceRestore): Promise<boolean> {
    const data = await this.diaryRepository.restore({ id: diaryId });
    console.log(data);
    return data.affected ? true : false;
  }

  async findAllWithDeleted({
    userId,
  }: IDiaryServiceFindAllWithDeleted): Promise<Diary[]> {
    return await this.diaryRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      withDeleted: true,
      relations: ['user'],
    });
  }
}
