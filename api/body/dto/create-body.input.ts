import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Min } from 'class-validator';

@InputType()
export class CreateBodyInput {
  @IsNotEmpty()
  @Field(() => Float)
  weight: number;

  @IsNotEmpty()
  @Min(0)
  @Field(() => Float)
  bodyFatMass: number;

  @IsNotEmpty()
  @Field(() => Float)
  skeletonMuscleMass: number;

  @Field(() => Float)
  height: number;

  @Field(() => Date)
  date: Date;

  @Field(() => String, { nullable: true })
  memo?: string;
}

// @InputType()
// export class ProductSaleslocationInput extends OmitType(
//   ProductSaleslocation,
//   ['id'],
//   InputType, // 기존의 ProductSaleslocation은 ObjectType => InputType으로 바꿀 필요가 있음
// ) {}
