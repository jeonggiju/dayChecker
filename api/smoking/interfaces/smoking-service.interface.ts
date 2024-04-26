import { CreateSmokingInput } from '../dto/create-smoking.input';
import { UpdateSmokingInput } from '../dto/update-smoking.input';

export interface ISmokingServiceCreate {
  createSmokingInput: CreateSmokingInput;
}

export interface ISmokingServiceRemove {
  smokingId: string;
}
export interface ISmokingServiceFindOne {
  smokingId: string;
}

export interface ISmokingServiceUpdate {
  smokingId: string;
  updateSmokingInput: UpdateSmokingInput;
}

export interface ISmokingServiceRestore {
  smokingId: string;
}
