export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    //call super to invoke base class , which is Error
    super(message);

    //only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}
