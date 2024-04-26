import { Field, ObjectType } from '@nestjs/graphql';
import { Exercise } from 'api/exercise/entities/exercise.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ExercisePart {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Exercise, (exercises) => exercises.exerciseParts)
  @Field(() => [Exercise])
  exercises: Exercise[]; // 여러 개를 가리킴
}
