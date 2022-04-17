import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';
import { Request, Response } from 'express';
import statusCode from 'http-status-codes';
import { resp } from '@infrastructure/transport/http/processor'

@controller('/api/v1/account')
export class AccountController {
  @httpGet('/profile')
  async accountProfile(@request() req: Request, @response() res: Response) {
    return res.status(statusCode.OK).json(resp({ ping: "PONG!!!" }, 'Success'));
  }
}

@controller("/api/v1/auth")
export class AuthController {
  @httpPost('/register')
  async accountRegister(@request() req: Request, @response() res: Response) {
    // return res.status(statusCode.OK).json(resp({ ping: "PONG!!!" }, 'Success'));
  }

  @httpPost('/login')
  async accountLogin(@request() req: Request, @response() res: Response) {
    // return res.status(statusCode.OK).json(resp({ ping: "PONG!!!" }, 'Success'));
  }
}