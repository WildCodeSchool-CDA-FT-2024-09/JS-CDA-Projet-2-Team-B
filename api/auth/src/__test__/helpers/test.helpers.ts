import * as cookie from 'cookie';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { ACCESS_TOKEN_SECRET } = process.env;

export const mockUserToken = jwt.sign(
  {
    email: 'user@user.com',
    role: 'user'
  },
  ACCESS_TOKEN_SECRET as string,
  { expiresIn: '1h' }
);

export const UserCookie = cookie.serialize('access_token', mockUserToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
});
