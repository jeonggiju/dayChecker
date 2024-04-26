import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class CreateStudyInput {
  @Field(() => Int)
  rating: number;

  @Field(() => String)
  studyTime: string;

  @Field(() => String, { nullable: true })
  memo?: string;

  @Field(() => String)
  userId: string;
}
