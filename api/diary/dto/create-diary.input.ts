import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateDiaryInput {
  @IsNotEmpty()
  @Field(() => String)
  diary: string;

  @IsNotEmpty()
  @Field(() => String)
  userId: string;

  @IsNotEmpty()
  @Field(() => Int)
  rating: number;
}
