import { CreateDiaryInput } from '../dto/create-diary.input';
import { UpdateDiaryInput } from '../dto/update-diary.input';

export interface IDiaryServiceCreate {
  createDiaryInput: CreateDiaryInput;
}

export interface IDiaryServiceRemove {
  diaryId: string;
}

export interface IDiaryServiceFindOne {
  diaryId: string;
}

export interface IDiaryServiceUpdate {
  diaryId: string;
  updateDiaryInput: UpdateDiaryInput;
}
export interface IDiaryServiceRestore {
  diaryId: string;
}
