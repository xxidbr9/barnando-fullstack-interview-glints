import config from "@config/main";
import { ApplicationError } from "@core/domain/AppError";
import { NextFunction, Request, Response } from "express";
import statusCode from 'http-status-codes';
import jwt from 'jsonwebtoken'


const jwtParserMiddleware = (req: Request, _res: Response, next: NextFunction) => {

  const accessToken = req.headers.authorization
  if (accessToken === null || accessToken === "") {
    throw new ApplicationError(statusCode.FORBIDDEN, statusCode.FORBIDDEN, `your access to ${req.originalUrl} is FORBIDDEN`)
  }

  const reqJwt = accessToken?.replace(/^Bearer\s+/, "");
  try {
    const payload = jwt.verify(reqJwt as string, config.JWT_SALT)
    // Normally again, i check the expire time and if expired try to user refresh_token in client
    req.body.jwt_payload = payload
    next()
  } catch (err) {
    throw new ApplicationError(statusCode.UNAUTHORIZED, statusCode.UNAUTHORIZED, "access token is invalid")
  }
}

export default jwtParserMiddleware