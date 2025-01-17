import { ErrorRequestHandler } from 'express';
import { CustomError } from '../errors/CustomError.error';

// Commented out because next paramater is needed for a error handler middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }

  console.error(err);
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};
