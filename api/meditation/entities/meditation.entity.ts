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
export class Meditation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('time')
  @Field(() => String)
  meditationTime: string;

  @Column('tinyint')
  @Field(() => Int)
  rating: number;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Column('mediumtext', { nullable: true })
  @Field(() => String, { nullable: true })
  memo?: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
