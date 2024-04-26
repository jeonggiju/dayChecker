import { CreateStudyInput } from '../dto/create-study.input';
import { UpdateStudyInput } from '../dto/update-study.input';

export interface IStudyServiceCreate {
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
