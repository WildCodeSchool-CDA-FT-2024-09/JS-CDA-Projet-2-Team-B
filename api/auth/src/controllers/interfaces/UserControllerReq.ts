import { UserDatamapperReq } from '../../datamappers/interfaces/UserDatamapperReq';
import { EntityControllerReq } from './EntityControllerReq';

type UserControllerReqWithoutData = Omit<UserDatamapperReq, 'data'>;

export interface UserControllerReq extends EntityControllerReq {
  datamapper: UserControllerReqWithoutData;
}
