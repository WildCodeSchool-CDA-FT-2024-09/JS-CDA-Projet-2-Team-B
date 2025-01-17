import { CustomError } from './CustomError.error';

export class AccessDeniedError extends CustomError {
  statusCode = 403;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, AccessDeniedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
