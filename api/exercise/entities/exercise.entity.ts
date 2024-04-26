import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ExercisePart } from 'api/exercise-part/entities/exercise-part.entity';
import { User } from 'api/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('time')
  @Field(() => String)
  exerciseTime: string;

  @JoinTable({
    name: 'exercise_exercise_part_join',
    joinColumn: { name: 'exerciseId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'exercisePartId', referencedColumnName: 'id' },
  })
  @ManyToMany(() => ExercisePart, (exerciseParts) => exerciseParts.exercises, {
    nullable: true,
  })
  @Field(() => [ExercisePart], { nullable: true })
  exerciseParts?: ExercisePart[];

  @Column('time', { nullable: true })
  @Field(() => String, { nullable: true })
  cardio?: string;

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
