import { TableNames } from '../../helpers/TableNames';
import { EntityDatamapperReq } from './EntityDatamapperReq';

export interface UserDatamapperReq extends EntityDatamapperReq {
  tableName: TableNames.User;
  data: {
    id?: number;
    last_name: string;
    first_name: string;
    email: string;
    password?: string;
    phone: string;
    starting_date: Date;
    ending_date: Date;
    role_id?: number;
  };
  insert(item: UserDatamapperReq['data']): Promise<UserDatamapperReq['data']>;
  updatePassword(
    password: string,
    id: number
  ): Promise<UserDatamapperReq['data']>;
}
