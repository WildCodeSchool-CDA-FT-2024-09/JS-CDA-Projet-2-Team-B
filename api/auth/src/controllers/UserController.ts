import { CoreController } from './CoreController';
import { UserControllerReq } from './interfaces/UserControllerReq';

export class UserController extends CoreController<UserControllerReq> {
  constructor(datamapper: UserControllerReq['datamapper']) {
    super(datamapper);

    this.datamapper = datamapper;
  }
}
