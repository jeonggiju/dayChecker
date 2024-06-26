import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meditation } from './entities/meditation.entity';
import {
  IMeditationServiceCreate,
  IMeditationServiceFindAllByUser,
  IMeditationServiceFindAllWithDeletedByUser,
  IMeditationServiceFindOneById,
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

  async findAllByUser({
    userId,
  }: IMeditationServiceFindAllByUser): Promise<Meditation[]> {
    const result = await this.meditationRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });
    return result;
  }
  async findOneById({
    meditationId,
  }: IMeditationServiceFindOneById): Promise<Meditation> {
    const result = await this.meditationRepository.findOne({
      where: { id: meditationId },
      relations: ['user'],
    });
    return result;
  }

  async create({
    userId,
    createMeditationInput,
  }: IMeditationServiceCreate): Promise<Meditation> {
    const result = this.meditationRepository.save({
      ...createMeditationInput,
      user: {
        id: userId,
      },
    });

    return result;
  }

  async remove({
    meditationId,
  }: IMeditationServiceRemove): Promise<Meditation> {
    const meditation = await this.findOneById({ meditationId });
    const result = await this.meditationRepository.softRemove(meditation);
    return result;
  }

  async update({
    meditationId,
    updateMeditationInput,
  }: IMeditationServiceUpdate): Promise<Meditation> {
    const prevData = await this.findOneById({ meditationId });
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

  async findAllWithDeletedByUser({
    userId,
  }: IMeditationServiceFindAllWithDeletedByUser): Promise<Meditation[]> {
    return await this.meditationRepository.find({
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
