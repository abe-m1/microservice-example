import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  //this will asign 'errors' as a propery on
  //the overall class
  constructor(public errors: ValidationError[]) {
    //call super to invoke base class , which is Error
    super('Invalid request parameters');

    //only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return {
        message: err.msg,
        field: err.param,
      };
    });
  }
}
