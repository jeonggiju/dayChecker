import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class CreateExerciseInput {
  @Field(() => String)
  exerciseTime: string;

  @Field(() => [String], { nullable: true })
  exerciseParts?: string[];

  @Field(() => String, { nullable: true })
  cardio?: string;

  @Field(() => Int)
  rating: number;

  @Field(() => String, { nullable: true })
  memo?: string;

  @Field(() => String)
  userId: string;
}
