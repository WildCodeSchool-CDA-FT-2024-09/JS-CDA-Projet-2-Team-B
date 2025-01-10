import { CoreController } from './CoreController';
import { RoleControllerReq } from './interfaces/RoleControllerReq';

export class RoleController extends CoreController<RoleControllerReq> {
  constructor(datamapper: RoleControllerReq['datamapper']) {
    super(datamapper);

    this.datamapper = datamapper;
  }
}
