import { CreateStudyInput } from '../dto/create-study.input';
import { UpdateStudyInput } from '../dto/update-study.input';

export interface IStudyServiceCreate {
  userId: string;
  createStudyInput: CreateStudyInput;
}

export interface IStudyServiceRemove {
  studyId: string;
}
export interface IStudyServiceFindOne {
  studyId: string;
}

export interface IStudyServiceUpdate {
  studyId: string;
  updateStudyInput: UpdateStudyInput;
}

export interface IStudyServiceRestore {
  studyId: string;
}

export interface IStudyServiceFindUsersAll {
  userId: string;
}
