import { IAuth } from '../auth/auth.interface';

export interface IUser extends IAuth {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  password: string;
  profileImg: string;
  _id?: number;
}
