import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'api/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Hobby {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToMany(() => User, (users) => users.hobby)
  @Field(() => [User])
  users: User[];

  @Column()
  @Field(() => String)
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
