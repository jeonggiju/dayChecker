import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBodyInput } from 'api/body/dto/create-body.input';
@InputType()
export class UpdateExerciseInput extends PartialType(CreateBodyInput) {}
