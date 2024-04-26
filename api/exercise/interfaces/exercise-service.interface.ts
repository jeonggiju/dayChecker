import { CreateExerciseInput } from '../dto/create-exercise.input';
import { UpdateExerciseInput } from '../dto/update-exercise.input';

export interface IExerciseServiceCreate {
  createExerciseInput: CreateExerciseInput;
}

export interface IExerciseServiceRemove {
  exerciseId: string;
}

export interface IExerciseServiceFindOne {
  exerciseId: string;
}
export interface IExerciseServiceUpdate {
  exerciseId: string;
  updateExerciseInput: UpdateExerciseInput;
}

export interface IExerciseServiceRestore {
  exerciseId: string;
}
