import { CreateDiaryInput } from '../dto/create-diary.input';
import { UpdateDiaryInput } from '../dto/update-diary.input';

export interface IDiaryServiceCreate {
  userId: string;
  createDiaryInput: CreateDiaryInput;
}

export interface IDiaryServiceRemove {
  diaryId: string;
}

export interface IDiaryServiceUpdate {
  diaryId: string;
  updateDiaryInput: UpdateDiaryInput;
}
export interface IDiaryServiceRestore {
  diaryId: string;
}
export interface IDiaryServiceFindAllByUser {
  userId: string;
}

export interface IDiaryServiceFindAllWithDeleted {
  userId: string;
}

export interface IDiaryServiceFindOneById {
  diaryId: string;
}
