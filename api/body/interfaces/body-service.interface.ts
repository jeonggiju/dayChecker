import { CreateBodyInput } from '../dto/create-body.input';
import { UpdateBodyInput } from '../dto/update-body.input';

export interface IBodyServiceCreate {
  createBodyInput: CreateBodyInput;
}

export interface IBodyServiceRemove {
  bodyId: string;
}

export interface IBodyServiceFindOne {
  bodyId: string;
}
export interface IBodyServiceUpdate {
  bodyId: string;
  updateBodyInput: UpdateBodyInput;
}
export interface IBodyServiceRestore {
  bodyId: string;
}
