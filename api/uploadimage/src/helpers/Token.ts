import { UserPayload } from './index.helpers';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

export default class Token {
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

  static setAccessTokenCookie = async (res: Response, accessToken: string) => {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  };
}
