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
