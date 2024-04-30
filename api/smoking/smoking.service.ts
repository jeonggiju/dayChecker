import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Smoking } from './entities/smoking.entity';
import { Repository } from 'typeorm';
import {
  ISmokingServiceCreate,
  ISmokingServiceFindAllByUser,
  ISmokingServiceFindAllWithDeleted,
  ISmokingServiceFindOneById,
  ISmokingServiceRemove,
  ISmokingServiceRestore,
  ISmokingServiceUpdate,
} from './interfaces/smoking-service.interface';

@Injectable()
export class SmokingService {
  constructor(
    @InjectRepository(Smoking)
    private readonly smokingRepository: Repository<Smoking>,
  ) {}

  async findAllByUser({
    userId,
  }: ISmokingServiceFindAllByUser): Promise<Smoking[]> {
    const result = await this.smokingRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return result;
  }

  async findOneById({
    smokingId,
  }: ISmokingServiceFindOneById): Promise<Smoking> {
    const result = await this.smokingRepository.findOne({
      where: { id: smokingId },
      relations: ['user'],
    });
    return result;
  }

  async create({
    userId,
    createSmokingInput,
  }: ISmokingServiceCreate): Promise<Smoking> {
    const result = this.smokingRepository.create({
      ...createSmokingInput,
      user: {
        id: userId,
      },
    });

    await this.smokingRepository.save(result);
    return result;
  }

  async remove({ smokingId }: ISmokingServiceRemove): Promise<Smoking> {
    const smoking = await this.findOneById({ smokingId });
    const result = await this.smokingRepository.softRemove(smoking);
    return result;
  }

  async update({
    smokingId,
    updateSmokingInput,
  }: ISmokingServiceUpdate): Promise<Smoking> {
    const prevData = await this.findOneById({ smokingId });
    const smokingData = this.smokingRepository.create({
      ...prevData,
      ...updateSmokingInput,
    });

    return await this.smokingRepository.save(smokingData);
  }

  async restore({ smokingId }: ISmokingServiceRestore): Promise<boolean> {
    const data = await this.smokingRepository.restore({ id: smokingId });
    console.log(data);
    return data.affected ? true : false;
  }

  async findAllWithDeleted({
    userId,
  }: ISmokingServiceFindAllWithDeleted): Promise<Smoking[]> {
    return await this.smokingRepository.find({
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
