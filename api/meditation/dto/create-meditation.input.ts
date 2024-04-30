import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, Min } from 'class-validator';

@InputType()
export class CreateMeditationInput {
  @IsNotEmpty()
  @Field(() => String)
  meditationTime: string;

  @IsNotEmpty()
  @Min(0)
  @Field(() => Int)
  rating: number;

  @Field(() => String, { nullable: true })
  memo?: string;
}
