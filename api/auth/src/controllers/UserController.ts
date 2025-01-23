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
  sendPasswordEmail,
  Token
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

    try {
      await this.datamapper.pool.query('BEGIN');

      const checkIfExists = await this.datamapper.findBySpecificField(
        'email',
        data.email
      );

      if (checkIfExists) {
        throw new BadRequestError(
          "Erreur lors de la création de l'utilisateur"
        );
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

      await this.datamapper.pool.query('COMMIT');

      const userWithoutPassword = { ...createdItem };
      delete userWithoutPassword.password;
      delete userWithoutPassword.role_id;

      const userWithRoleName = {
        ...userWithoutPassword,
        role: defaultRole.name
      };

      res.status(201).json(userWithRoleName);
    } catch (error) {
      console.error(error);
      await this.datamapper.pool.query('ROLLBACK');
      throw new BadRequestError("Erreur lors de la création de l'utilisateur");
    }
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

    if (date < user.starting_date) {
      throw new BadRequestError("Votre compte n'est pas encore actif.");
    }

    delete user.password;

    const foundRole = await roleDatamapper.findByPk(user.role_id);

    if (!foundRole) {
      throw new NotFoundError('Rôle non trouvé.');
    }

    delete user.role_id;
    const roleName = foundRole.name;

    const userWithRoleName = {
      ...user,
      role: roleName
    };

    const userPayload = {
      email: user.email,
      role: roleName
    };

    const accessToken = await Token.generateAccessToken(userPayload);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(200).json({ user: userWithRoleName });
  };

  getByEmail = async (req: Request, res: Response): Promise<void> => {
    const email = req.user?.email;

    const user = await this.datamapper.findBySpecificField('email', email!);

    if (!user) {
      throw new NotFoundError('Utilisateur non trouvé.');
    }

    delete user.password;

    delete user.id;
    delete user.role_id;
    delete user.starting_date;
    delete user.ending_date;

    res.status(200).json({ user });
  };

  changePassword = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const email = req.user?.email;

    const user = await this.datamapper.findBySpecificField('email', email!);

    if (!user) {
      throw new NotFoundError('Utilisateur non trouvé.');
    }

    const isPasswordValid = await argon2.verify(
      user.password,
      data.currentPassword
    );

    if (!isPasswordValid) {
      throw new BadRequestError('Mot de passe actuel incorrect.');
    }

    const hashedPassword = await argon2.hash(data.newPassword);

    const updatedUser = await this.datamapper.updatePassword(
      hashedPassword,
      user.id
    );

    if (!updatedUser) {
      throw new DatabaseConnectionError();
    }

    res.status(200).json({ success: true });
  };
}
