import { Request, Response } from 'express';
import { CoreController } from './CoreController';
import { UserControllerReq } from './interfaces/UserControllerReq';
import {
  BadRequestError,
  DatabaseConnectionError
} from '../errors/index.errors';
import { roleDatamapper } from '../datamappers/index.datamappers';
import { NotFoundError } from '../errors/NotFoundError.error';
import argon2 from 'argon2';
import { generateRandomString } from '../helpers/generateRandomString.helper';
import { sendPasswordEmail } from '../helpers/sendPasswordEmail.util';

export class UserController
  extends CoreController<UserControllerReq>
  implements UserControllerReq
{
  constructor(datamapper: UserControllerReq['datamapper']) {
    super(datamapper);

    this.datamapper = datamapper;
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;

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

    const password = await generateRandomString(10);

    const hashedPassword = await argon2.hash(password);

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

    const { success } = await sendPasswordEmail(newUser.email, password);

    if (!success) {
      throw new BadRequestError(
        "Une erreur est survenue lors de l'envoi de l'email contenant le mot de passe."
      );
    }

    res.status(201).json(createdItem);
  };
}
