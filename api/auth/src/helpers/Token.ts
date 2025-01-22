import { BadRequestError } from '../errors/index.errors';
import { UserPayload } from './index.helpers';
import jwt from 'jsonwebtoken';

const { ACCESS_TOKEN_SECRET } = process.env;

export default class Token {
  static generateAccessToken = async ({ email, role }: UserPayload) => {
    const user = { email, role };

    if (!ACCESS_TOKEN_SECRET) {
      throw new BadRequestError("La clé secrète n'est pas définie.");
    }

    const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {
      expiresIn: '1d'
    });

    return accessToken;
  };

  static verify = async (
    token: string,
    secret: string
  ): Promise<UserPayload> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as UserPayload);
        }
      });
    });
  };
}
