import * as cookie from 'cookie';
import { mockUserToken } from './generateToken.helper';

export const UserCookie = cookie.serialize('access_token', mockUserToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
});
