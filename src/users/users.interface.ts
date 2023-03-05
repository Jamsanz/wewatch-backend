import { IAuth } from '../auth/auth.interface';

export interface IUser extends IAuth {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  state: string;
  lga: string;
  ward?: string;
  pollingUnit: string;
  role: string;
  pushToken?: string;
}
