import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Body } from './entities/body.entity';
import { Repository } from 'typeorm';
import {
  IBodyServiceCreate,
  IBodyServiceFindAllByUser,
  IBodyServiceFindAllWithRemoved,
  IBodyServiceFindOneById,
  IBodyServiceRemove,
  IBodyServiceRestore,
  IBodyServiceUpdate,
} from './interfaces/body-service.interface';

@Injectable()
export class BodyService {
  constructor(
    @InjectRepository(Body)
    private readonly bodyRepository: Repository<Body>,
  ) {}

  async findAllByUser({ userId }: IBodyServiceFindAllByUser): Promise<Body[]> {
    const result = await this.bodyRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });
    return result;
  }

  async findOneById({ bodyId }: IBodyServiceFindOneById): Promise<Body> {
    const result = await this.bodyRepository.findOne({
      where: { id: bodyId },
      relations: ['user'],
    });
    return result;
  }

  async create({ userId, createBodyInput }: IBodyServiceCreate) {
    const result = await this.bodyRepository.save({
      ...createBodyInput,
      user: {
        id: userId,
      },
    });
    return result;
  }

  async remove({ bodyId }: IBodyServiceRemove): Promise<Body> {
    const body = await this.findOneById({ bodyId });
    const result = await this.bodyRepository.softRemove(body);
    return result;
  }

  async update({ bodyId, updateBodyInput }: IBodyServiceUpdate): Promise<Body> {
    const prevData = await this.findOneById({ bodyId });
    console.log(prevData);
    const bodyData = this.bodyRepository.create({
      ...prevData,
      ...updateBodyInput,
    });

    return await this.bodyRepository.save(bodyData);
  }

  async restore({ bodyId }: IBodyServiceRestore): Promise<boolean> {
    const data = await this.bodyRepository.restore({ id: bodyId });
    console.log(data);
    return data.affected ? true : false;
  }

  async findAllWithRemoved({
    userId,
  }: IBodyServiceFindAllWithRemoved): Promise<Body[]> {
    return await this.bodyRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
      withDeleted: true,
    });
  }
}
