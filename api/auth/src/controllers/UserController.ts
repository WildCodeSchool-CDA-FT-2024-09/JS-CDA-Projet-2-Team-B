import { Request, Response } from 'express';
import { CoreController } from './CoreController';
import { UserControllerReq } from './interfaces/UserControllerReq';
import {
  BadRequestError,
  DatabaseConnectionError,
  NotFoundError
} from '../errors/index.errors';
import { roleDatamapper } from '../datamappers/index.datamappers';
import argon2 from 'argon2';
import {
  generateRandomString,
  sendPasswordEmail
} from '../helpers/index.helpers';

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
      throw new NotFoundError('Rôle par défaut non trouvé.');
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

    const userWithoutPassword = { ...createdItem };
    delete userWithoutPassword.password;

    res.status(201).json(userWithoutPassword);
  };

  signin = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;

    const user = await this.datamapper.findBySpecificField('email', data.email);

    if (!user) {
      throw new NotFoundError('Utilisateur non trouvé.');
    }

    const isPasswordValid = await argon2.verify(user.password, data.password);

    if (!isPasswordValid) {
      throw new BadRequestError('Mot de passe incorrect.');
    }

    const date = new Date();

    if (date > user.ending_date) {
      throw new BadRequestError('Votre compte a expiré.');
    }

    delete user.password;

    res.status(200).json(user);
  };
}
