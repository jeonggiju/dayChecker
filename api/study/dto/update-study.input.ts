import { InputType, PartialType } from '@nestjs/graphql';
import { CreateStudyInput } from './create-study.input';
@InputType()
export class UpdateStudyInput extends PartialType(CreateStudyInput) {}
