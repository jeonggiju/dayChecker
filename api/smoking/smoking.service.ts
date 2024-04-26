import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Smoking } from './entities/smoking.entity';
import { Repository } from 'typeorm';
import {
  ISmokingServiceCreate,
  ISmokingServiceFindOne,
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

  async findAll(): Promise<Smoking[]> {
    const result = await this.smokingRepository.find({
      relations: ['user'],
    });
    return result;
  }

  async findOne({ smokingId }: ISmokingServiceFindOne): Promise<Smoking> {
    const result = await this.smokingRepository.findOne({
      where: { id: smokingId },
      relations: ['user'],
    });
    return result;
  }

  async create({
    createSmokingInput,
  }: ISmokingServiceCreate): Promise<Smoking> {
    const { userId, ...smoking } = createSmokingInput;

    const result = this.smokingRepository.create({
      ...smoking,
      user: {
        id: userId,
      },
    });

    await this.smokingRepository.save(result);
    return result;
  }

  async remove({ smokingId }: ISmokingServiceRemove): Promise<Smoking> {
    const smoking = await this.findOne({ smokingId });
    const result = await this.smokingRepository.softRemove(smoking);
    return result;
  }

  async update({
    smokingId,
    updateSmokingInput,
  }: ISmokingServiceUpdate): Promise<Smoking> {
    const prevData = await this.findOne({ smokingId });
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

  async findAllWithDeleted(): Promise<Smoking[]> {
    return await this.smokingRepository.find({
      withDeleted: true,
      relations: ['user'],
    });
  }
}
