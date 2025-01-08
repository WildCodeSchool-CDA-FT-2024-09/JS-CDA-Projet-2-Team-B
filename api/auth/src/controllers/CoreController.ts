import { EntityControllerReq } from './interfaces/EntityControllerReq';

export abstract class CoreController<T extends EntityControllerReq> {
  constructor(public datamapper: T['datamapper']) {}
}
