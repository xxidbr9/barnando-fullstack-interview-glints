import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';
import { Request, Response } from 'express';
import statusCode from 'http-status-codes';
import { resp } from '@infrastructure/transport/http/processor'
import { KEYS } from '@core/keys';
import { inject } from 'inversify';
import { AccountApplicationService } from '@app/account/service/account.service';
import { ApplicationError } from '@core/domain/AppError';
import { shallowEqual } from 'shallow-equal-object';
import jwt from 'jsonwebtoken';
import config from '@config/main';

@controller('/api/v1/account')
export class AccountController {
  constructor(
    @inject(KEYS.AccountApplication)
    private readonly service: AccountApplicationService
  ) { }

  @httpGet('/profile')
  async accountProfile(@request() req: Request, @response() res: Response) {
    this.service.sayHallo()
    return res.status(statusCode.OK).json(resp({ ping: "PONG!!!" }, 'Success'));
  }
}


// For bigger app, auth doesn't belong here
@controller("/api/v1/auth")
export class AuthController {
  constructor(
    @inject(KEYS.AccountApplication)
    private readonly service: AccountApplicationService
  ) { }

  @httpPost('/register')
  async accountRegister(@request() req: Request, @response() res: Response) {

    if (shallowEqual(req.body, {})) {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "field are required")
    }

    const email = req.body.email
    if (!email || email === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "email are required")
    }

    const password = req.body.password
    if (!password || password === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "password are required")
    }

    const fullName = req.body.full_name
    if (!fullName || fullName === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "your full name are required")
    }

    await this.service.register(email, password, fullName)
    return res.status(statusCode.OK).json(resp({}, 'Success register'));
  }

  @httpPost('/login')
  async accountLogin(@request() req: Request, @response() res: Response) {
    // normally i do refresh token, short expire time for secure the access
    // const data = jwt.sign({ user_id: 123 }, config.JWT_SALT, {})
    const email = req.body.email
    if (!email || email === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "email are required")
    }

    const password = req.body.password
    if (!password || password === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "password are required")
    }
    try {
      const userID = await this.service.login(email, password)
      const jwtData = jwt.sign({ user_id: userID }, config.JWT_SALT)
      return res.status(statusCode.OK).json(resp({ access_token: jwtData }, 'Success, but normally i do refresh_token, and a short expire time for secure the access'));
    } catch (err) {
      const error = err as { message: string }
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, error.message)
    }
  }
}