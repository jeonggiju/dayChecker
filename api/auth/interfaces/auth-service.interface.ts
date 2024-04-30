import { IAuthUser, IContext } from 'api/common/interfaces/common';
import { User } from 'api/user/entities/user.entity';

export interface IAuthServiceLogin {
  email: string;
  password: string;
  context: IContext;
}
export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  context: IContext;
}

export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user'];
}
