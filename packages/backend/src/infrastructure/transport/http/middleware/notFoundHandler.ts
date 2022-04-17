import statusCode from 'http-status-codes';
import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  return res.status(statusCode.NOT_FOUND).json({
    status: statusCode.NOT_FOUND,
    error: `your request to ${url} is not found`
  });
};
