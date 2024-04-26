import { Field, Float, ObjectType } from '@nestjs/graphql';
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
export class Body {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('float')
  @Field(() => Float)
  weight: number;

  @Column('float')
  @Field(() => Float)
  bodyFatMass: number;

  @Column('float')
  @Field(() => Float)
  skeletonMuscleMass: number;

  @Column('float')
  @Field(() => Float)
  height: number;

  @Column()
  @Field(() => Date)
  date: Date;

  @Column('mediumtext', { nullable: true })
  @Field(() => String, { nullable: true })
  memo?: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
