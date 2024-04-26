import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'api/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Diary {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('longtext')
  @Field(() => String)
  diary: string;

  @Column('tinyint')
  @Field(() => Int)
  rating: number;

  @ManyToOne(() => User, (user) => user.diary)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
