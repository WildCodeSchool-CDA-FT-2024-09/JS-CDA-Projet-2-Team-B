import { Request, Response } from 'express';
import { CoreController } from './CoreController';
import { UserControllerReq } from './interfaces/UserControllerReq';
import {
  BadRequestError,
  DatabaseConnectionError
} from '../errors/index.errors';
import { UserDatamapperReq } from '../datamappers/interfaces/UserDatamapperReq';
import { roleDatamapper } from '../datamappers/index.datamappers';
import { NotFoundError } from '../errors/NotFoundError.error';
import argon2 from 'argon2';

export class UserController
  extends CoreController<UserControllerReq>
  implements UserControllerReq
{
  constructor(datamapper: UserControllerReq['datamapper']) {
    super(datamapper);

    this.datamapper = datamapper;
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const data: UserDatamapperReq['data'] = req.body;

    const checkIfExists = await this.datamapper.findBySpecificField(
      'email',
      data.email
    );

    if (checkIfExists) {
      throw new BadRequestError("Erreur lors de la création de l'utilisateur");
    }

    const defaultRole = await roleDatamapper.findByPk(2);

    if (!defaultRole) {
      throw new NotFoundError();
    }

    const hashedPassword = await argon2.hash(data.password);

    const newUser = {
      ...data,
      role_id: defaultRole.id,
      password: hashedPassword,
      email: data.email.toLowerCase()
    };

    const createdItem = await this.datamapper.insert(newUser);

    if (!createdItem) {
      throw new DatabaseConnectionError();
    }

    res.status(201).json(createdItem);
  };
}
