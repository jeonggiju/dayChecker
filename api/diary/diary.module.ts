import { Module } from '@nestjs/common';
import { DiaryResolver } from './diary.resolver';
import { DiaryService } from './diary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  providers: [DiaryResolver, DiaryService],
})
export class DiaryModule {}
