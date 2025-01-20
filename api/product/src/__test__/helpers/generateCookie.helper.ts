import * as cookie from 'cookie';
import { mockUserToken } from './generateToken.helper';

export const cookieString = cookie.serialize('access_token', mockUserToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
});
