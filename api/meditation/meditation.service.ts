import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meditation } from './entities/meditation.entity';
import {
  IMeditationServiceCreate,
  IMeditationServiceFindOne,
  IMeditationServiceRemove,
  IMeditationServiceRestore,
  IMeditationServiceUpdate,
} from './interfaces/meditation-service.interface';

@Injectable()
export class MeditationService {
  constructor(
    @InjectRepository(Meditation)
    private readonly meditationRepository: Repository<Meditation>,
  ) {}

  async findAll(): Promise<Meditation[]> {
    const result = await this.meditationRepository.find({
      relations: ['user'],
    });
    return result;
  }
  async findOne({
    meditationId,
  }: IMeditationServiceFindOne): Promise<Meditation> {
    const result = await this.meditationRepository.findOne({
      where: { id: meditationId },
      relations: ['user'],
    });
    return result;
  }

  async create({
    createMeditationInput,
  }: IMeditationServiceCreate): Promise<Meditation> {
    const { userId, ...meditation } = createMeditationInput;

    const result = this.meditationRepository.save({
      ...meditation,
      user: {
        id: userId,
      },
    });

    return result;
  }

  async remove({
    meditationId,
  }: IMeditationServiceRemove): Promise<Meditation> {
    const meditation = await this.findOne({ meditationId });
    const result = await this.meditationRepository.softRemove(meditation);
    return result;
  }

  async update({
    meditationId,
    updateMeditationInput,
  }: IMeditationServiceUpdate): Promise<Meditation> {
    const prevData = await this.findOne({ meditationId });
    const meditationData = this.meditationRepository.create({
      ...prevData,
      ...updateMeditationInput,
    });

    return await this.meditationRepository.save(meditationData);
  }

  async restore({ meditationId }: IMeditationServiceRestore): Promise<boolean> {
    const data = await this.meditationRepository.restore({ id: meditationId });
    console.log(data);
    return data.affected ? true : false;
  }

  async findAllWithDeleted(): Promise<Meditation[]> {
    return await this.meditationRepository.find({
      withDeleted: true,
      relations: ['user'],
    });
  }
}
