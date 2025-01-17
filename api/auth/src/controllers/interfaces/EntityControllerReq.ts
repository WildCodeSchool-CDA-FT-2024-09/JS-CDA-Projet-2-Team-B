import { Request, Response } from 'express';
import { EntityDatamapperReq } from '../../datamappers/interfaces/EntityDatamapperReq';

type EntityDatamapperReqWithoutData = Omit<EntityDatamapperReq, 'data'>;

export interface EntityControllerReq {
  datamapper: EntityDatamapperReqWithoutData;
  getAll(req: Request, res: Response): Promise<void>;
}
