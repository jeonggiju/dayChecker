import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyResolver } from './study.resolver';
import { StudyService } from './study.service';
import { Study } from './entities/study.entity';
import { UserModule } from 'api/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Study]), UserModule],
  providers: [StudyResolver, StudyService],
})
export class StudyModule {}
