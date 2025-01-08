import { TableNames } from 'helpers/TableNames';
import { EntityDatamapperReq } from './EntityDatamapperReq';

export interface UserDatamapperReq extends EntityDatamapperReq {
  tableName: TableNames.User;
  data: {
    id?: number;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    phone: string;
    startingDate: Date;
    endingDate: Date;
  };
}
