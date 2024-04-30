import { CreateSmokingInput } from '../dto/create-smoking.input';
import { UpdateSmokingInput } from '../dto/update-smoking.input';

export interface ISmokingServiceCreate {
  userId: string;
  createSmokingInput: CreateSmokingInput;
}

export interface ISmokingServiceRemove {
  smokingId: string;
}
export interface ISmokingServiceFindOneById {
  smokingId: string;
}

export interface ISmokingServiceUpdate {
  smokingId: string;
  updateSmokingInput: UpdateSmokingInput;
}

export interface ISmokingServiceRestore {
  smokingId: string;
}

export interface ISmokingServiceFindAllByUser {
  userId: string;
}
export interface ISmokingServiceFindAllWithDeleted {
  userId: string;
}
