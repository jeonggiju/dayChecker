import { InputType, PartialType } from '@nestjs/graphql';
import { CreateDiaryInput } from './create-diary.input';

@InputType()
export class UpdateDiaryInput extends PartialType(CreateDiaryInput) {}
