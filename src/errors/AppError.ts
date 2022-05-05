export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode: statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
