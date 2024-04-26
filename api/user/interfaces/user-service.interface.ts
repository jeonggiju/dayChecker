import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

export interface IUserServiceCreate {
  createUserInput: CreateUserInput;
}
export interface IUserServiceRemove {
  userId: string;
}

export interface IUserServiceFindOne {
  userId: string;
}

export interface IUserServiceUpdate {
  userId: string;
  updateUserInput: UpdateUserInput;
}
export interface IUserServiceCleaningHobbies {
  hobby: string[];
}

export interface IUserServiceRestore {
  userId: string;
}

export interface IUserServiceFindUserByEmail {
  userEmail: string;
}
