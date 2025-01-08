import { EntityDatamapperReq } from '../../datamappers/interfaces/EntityDatamapperReq';

type EntityDatamapperReqWithoutData = Omit<EntityDatamapperReq, 'data'>;

export interface EntityControllerReq {
  datamapper: EntityDatamapperReqWithoutData;
}
