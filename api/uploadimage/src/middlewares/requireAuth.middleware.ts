import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotAuthorizedError } from '../errors/index.errors';
import { Token, UserPayload } from '../helpers/index.helpers';

declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies['access_token'];

  if (!accessToken) {
    throw new NotAuthorizedError();
  } else if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new BadRequestError("La clé secrète n'est pas définie.");
  }

  try {
    const decodedToken = await Token.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = decodedToken as UserPayload;

    next();
  } catch (err) {
    console.error('La vérification du token a échouée : ', err);
    throw new NotAuthorizedError();
  }
};
