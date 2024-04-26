import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entity';
import { Repository } from 'typeorm';
import {
  IDiaryServiceCreate,
  IDiaryServiceFindOne,
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

  async findAll(): Promise<Diary[]> {
    return await this.diaryRepository.find({
      relations: ['user'],
    });
  }

  async findOne({ diaryId }: IDiaryServiceFindOne): Promise<Diary> {
    const result = await this.diaryRepository.findOne({
      where: { id: diaryId },
      relations: ['user'],
    });
    return result;
  }

  async create({ createDiaryInput }: IDiaryServiceCreate): Promise<Diary> {
    const { userId, ...diary } = createDiaryInput;

    const result = await this.diaryRepository.create({
      ...diary,
      user: {
        id: userId,
      },
    });

    await this.diaryRepository.save(result);
    return result;
  }

  async remove({ diaryId }: IDiaryServiceRemove): Promise<Diary> {
    const diary = await this.findOne({ diaryId });
    const result = await this.diaryRepository.softRemove(diary);
    return result;
  }

  async update({
    diaryId,
    updateDiaryInput,
  }: IDiaryServiceUpdate): Promise<Diary> {
    const prevData = await this.findOne({ diaryId });
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

  async findAllWithDeleted(): Promise<Diary[]> {
    return await this.diaryRepository.find({
      withDeleted: true,
      relations: ['user'],
    });
  }
}
