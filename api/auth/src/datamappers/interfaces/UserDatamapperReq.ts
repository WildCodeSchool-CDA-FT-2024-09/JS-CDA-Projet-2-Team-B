import { TableNames } from '../../helpers/TableNames';
import { EntityDatamapperReq } from './EntityDatamapperReq';

export interface UserDatamapperReq extends EntityDatamapperReq {
  tableName: TableNames.User;
  data: {
    id?: number;
    last_name: string;
    first_name: string;
    email: string;
    password: string;
    phone: string;
    starting_date: Date;
    ending_date: Date;
  };
}
