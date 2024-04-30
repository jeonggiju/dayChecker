import { CreateBodyInput } from '../dto/create-body.input';
import { UpdateBodyInput } from '../dto/update-body.input';

export interface IBodyServiceCreate {
  createBodyInput: CreateBodyInput;
  userId: string;
}

export interface IBodyServiceRemove {
  bodyId: string;
}

export interface IBodyServiceFindOneById {
  bodyId: string;
}
export interface IBodyServiceUpdate {
  bodyId: string;
  updateBodyInput: UpdateBodyInput;
}
export interface IBodyServiceRestore {
  bodyId: string;
}

export interface IBodyServiceFindAllByUser {
  userId: string;
}

export interface IBodyServiceFindAllWithRemoved {
  userId: string;
}
