import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'api/auth/auth.module';
import { BodyModule } from 'api/body/body.module';
import { Body } from 'api/body/entities/body.entity';
import { DiaryModule } from 'api/diary/diary.module';
import { Diary } from 'api/diary/entities/diary.entity';
import { ExercisePart } from 'api/exercise-part/entities/exercise-part.entity';
import { ExercisePartModule } from 'api/exercise-part/exercise-part.module';
import { Exercise } from 'api/exercise/entities/exercise.entity';
import { ExerciseModule } from 'api/exercise/exercise.module';
import { Hobby } from 'api/hobby/entities/hobby.entity';
import { HobbyModule } from 'api/hobby/hobby.module';
import { Meditation } from 'api/meditation/entities/meditation.entity';
import { MeditationModule } from 'api/meditation/meditation.module';
import { Smoking } from 'api/smoking/entities/smoking.entity';
import { SmokingModule } from 'api/smoking/smoking.module';
import { Study } from 'api/study/entities/study.entity';
import { StudyModule } from 'api/study/study.module';
import { User } from 'api/user/entities/user.entity';
import { UserModule } from 'api/user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/graphql.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [
        User,
        Smoking,
        Study,
        Exercise,
        ExercisePart,
        Meditation,
        Diary,
        Body,
        Hobby,
      ],
      logging: true,
      synchronize: true,
    }),
    UserModule,
    HobbyModule,
    BodyModule,
    DiaryModule,
    MeditationModule,
    SmokingModule,
    StudyModule,
    ExerciseModule,
    ExercisePartModule,
  ],
})
export class AppModule {}
