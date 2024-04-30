import { CreateMeditationInput } from '../dto/create-meditation.input';
import { UpdateMeditationInput } from '../dto/update-meditation.input';

export interface IMeditationServiceCreate {
  userId: string;
  createMeditationInput: CreateMeditationInput;
}

export interface IMeditationServiceRemove {
  meditationId: string;
}

export interface IMeditationServiceUpdate {
  meditationId: string;
  updateMeditationInput: UpdateMeditationInput;
}

export interface IMeditationServiceRestore {
  meditationId: string;
}
export interface IMeditationServiceFindAllByUser {
  userId: string;
}

export interface IMeditationServiceFindOneById {
  meditationId: string;
}

export interface IMeditationServiceFindAllWithDeletedByUser {
  userId: string;
}
