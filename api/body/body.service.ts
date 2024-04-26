import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Body } from './entities/body.entity';
import { Repository } from 'typeorm';
import {
  IBodyServiceCreate,
  IBodyServiceFindOne,
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

  async findAllWithRemoved(): Promise<Body[]> {
    const result = await this.bodyRepository.find({
      relations: ['user'],
      lock: {
        mode: 'pessimistic_write',
      },
      withDeleted: true,
    });
    return result;
  }

  async findAll(): Promise<Body[]> {
    const result = await this.bodyRepository.find({
      relations: ['user'],
    });
    return result;
  }

  async findOne({ bodyId }: IBodyServiceFindOne): Promise<Body> {
    const result = await this.bodyRepository.findOne({
      where: { id: bodyId },
      relations: ['user'],
    });
    return result;
  }

  async create({ createBodyInput }: IBodyServiceCreate) {
    const { userId, ...body } = createBodyInput;

    const result = await this.bodyRepository.save({
      ...body,
      user: {
        id: userId,
      },
    });
    return result;
  }

  async remove({ bodyId }: IBodyServiceRemove): Promise<Body> {
    const body = await this.findOne({ bodyId });
    const result = await this.bodyRepository.softRemove(body);
    return result;
  }

  async update({ bodyId, updateBodyInput }: IBodyServiceUpdate): Promise<Body> {
    const prevData = await this.findOne({ bodyId });
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

  async findAllWithDeleted(): Promise<Body[]> {
    return await this.bodyRepository.find({
      relations: ['user'],
      withDeleted: true,
    });
  }
}
