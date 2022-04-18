import statusCode from 'http-status-codes';
import { Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: any) => {
  console.log(`[ERROR] : ${err.message}`);
  if (err) {
    return res.status(err.httpStatusCode || statusCode.INTERNAL_SERVER_ERROR).json({
      status: err.statusCode || 500,
      error: err.message
    });
  }
  next()
};
