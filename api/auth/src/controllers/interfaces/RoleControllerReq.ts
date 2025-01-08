import { RoleDatamapperReq } from '../../datamappers/interfaces/RoleDatamapperReq';
import { EntityControllerReq } from './EntityControllerReq';

type RoleControllerReqWithoutData = Omit<RoleDatamapperReq, 'data'>;

export interface RoleControllerReq extends EntityControllerReq {
  datamapper: RoleControllerReqWithoutData;
}
