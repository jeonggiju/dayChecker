import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBodyInput } from './create-body.input';

@InputType()
export class UpdateBodyInput extends PartialType(CreateBodyInput) {}
