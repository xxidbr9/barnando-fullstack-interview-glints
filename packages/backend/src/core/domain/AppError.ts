export class ApplicationError extends Error {
  public readonly statusCode: string | number;
  public readonly httpStatusCode: number;
  constructor(statusCode: string | number, httpStatusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.httpStatusCode = httpStatusCode;
  }
}