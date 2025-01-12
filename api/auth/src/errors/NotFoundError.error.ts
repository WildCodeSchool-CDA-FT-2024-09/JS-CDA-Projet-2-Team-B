import { CustomError } from './CustomError.error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
