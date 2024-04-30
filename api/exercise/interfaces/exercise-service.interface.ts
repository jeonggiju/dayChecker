import { CreateExerciseInput } from '../dto/create-exercise.input';
import { UpdateExerciseInput } from '../dto/update-exercise.input';

export interface IExerciseServiceCreate {
  userId: string;
  createExerciseInput: CreateExerciseInput;
}

export interface IExerciseServiceRemove {
  exerciseId: string;
}

export interface IExerciseServiceFindOneById {
  exerciseId: string;
}
export interface IExerciseServiceUpdate {
  exerciseId: string;
  updateExerciseInput: UpdateExerciseInput;
}

export interface IExerciseServiceRestore {
  exerciseId: string;
}
export interface IExerciseServiceFindAllByUser {
  userId: string;
}

export interface IExerciseServiceFindAllWithDeleted {
  userId: string;
}
