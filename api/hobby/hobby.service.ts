import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm'; // Connection import 추가
import { Hobby } from './entities/hobby.entity';
import {
  IHobbyServiceBulkInsert,
  IHobbyServiceFindByName,
} from './interfaces/hobby-service.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HobbyService {
  constructor(
    @InjectRepository(Hobby)
    private readonly hobbyRepository: Repository<Hobby>,
  ) {}

  findByNames({ hobbyNames }: IHobbyServiceFindByName): Promise<Hobby[]> {
    return this.hobbyRepository.find({
      where: { name: In(hobbyNames) },
    });
  }

  bulkInsert({ names }: IHobbyServiceBulkInsert) {
    return this.hobbyRepository.insert(names);
  }
}
