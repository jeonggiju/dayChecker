import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSmokingInput } from './create-smoking.input';
@InputType()
export class UpdateSmokingInput extends PartialType(CreateSmokingInput) {}
