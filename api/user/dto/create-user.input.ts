import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @Min(0)
  @Field(() => Int, { nullable: true })
  age?: number;

  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @Field(() => String)
  school?: string;

  @IsNotEmpty()
  @Field(() => String)
  password: string;

  @Field(() => [String])
  hobby: string[];
}
