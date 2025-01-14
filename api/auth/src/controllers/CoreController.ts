import { Request, Response } from 'express';
import { NotFoundError } from '../errors/NotFoundError.error';
import { EntityControllerReq } from './interfaces/EntityControllerReq';

export abstract class CoreController<T extends EntityControllerReq> {
  constructor(public datamapper: T['datamapper']) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    const itemsList = await this.datamapper.findAll();

    if (!itemsList) {
      throw new NotFoundError();
    }

    res.status(200).send(itemsList);
  };
}
