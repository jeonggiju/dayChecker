import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class CreateSmokingInput {
  @Field(() => Int)
  rating: number;

  @Field(() => String, { nullable: true })
  memo?: string;

  @Field(() => String)
  userId: string;
}
