import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMeditationInput } from './create-meditation.input';

@InputType()
export class UpdateMeditationInput extends PartialType(CreateMeditationInput) {}
