import { ISODate } from '../types/dates.type';

export interface User {
  country: string;
  username: string;
  birthday: ISODate;
}
