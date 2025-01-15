import { Request, Response, NextFunction } from 'express';

export const errorCatcher =
  (
    asyncHandler: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncHandler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
