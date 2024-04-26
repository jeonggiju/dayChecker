import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Body } from 'api/body/entities/body.entity';
import { Diary } from 'api/diary/entities/diary.entity';
import { Exercise } from 'api/exercise/entities/exercise.entity';
import { Hobby } from 'api/hobby/entities/hobby.entity';
import { Meditation } from 'api/meditation/entities/meditation.entity';
import { Smoking } from 'api/smoking/entities/smoking.entity';
import { Study } from 'api/study/entities/study.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column()
  @Field(() => String)
  school: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @JoinTable({
    name: 'user_hobby_join',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'hobbyId', referencedColumnName: 'id' },
  })
  @ManyToMany(() => Hobby, (hobby) => hobby.users, { nullable: true })
  @Field(() => [Hobby], { nullable: true })
  hobby?: Hobby[]; // 여러 개를 가리킴

  @OneToMany(() => Diary, (diary) => diary.user, {
    cascade: ['insert', 'update', 'soft-remove'],
    nullable: true,
  })
  @Field(() => [Diary], { nullable: true })
  diary?: Diary[];

  @OneToMany(() => Exercise, (exercise) => exercise.user, {
    cascade: ['insert', 'update', 'soft-remove'],
    nullable: true,
  })
  @Field(() => [Exercise], { nullable: true })
  exercise?: Exercise[];

  @OneToMany(() => Meditation, (meditation) => meditation.user, {
    nullable: true,
  })
  @Field(() => [Meditation], { nullable: true })
  meditation?: Meditation[];

  @OneToMany(() => Body, (body) => body.user, {
    cascade: ['insert', 'update', 'soft-remove'],
    nullable: true,
  })
  @Field(() => [Body], { nullable: true })
  body?: Body[];

  @OneToMany(() => Smoking, (smoking) => smoking.user, {
    cascade: ['insert', 'update', 'soft-remove'],
    nullable: true,
  })
  @Field(() => [Smoking], { nullable: true })
  smoking?: Smoking[];

  @OneToMany(() => Study, (study) => study.user, {
    cascade: ['insert', 'update', 'soft-remove'],
    nullable: true,
  })
  @Field(() => [Study], { nullable: true })
  study?: Study[];

  // 등록 시간 자동 추가
  @CreateDateColumn()
  createdAt: Date;

  // softDelete의 시간 기록을 위함
  @DeleteDateColumn()
  deleteAt: Date;
}
