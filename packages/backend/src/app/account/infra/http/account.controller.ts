import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';
import { Request, Response } from 'express';
import statusCode from 'http-status-codes';
import { resp } from '@infrastructure/transport/http/processor'
import { KEYS } from '@core/keys';
import { inject } from 'inversify';
import { AccountApplicationService } from '@app/account/service/account.service';

@controller('/api/v1/account')
export class AccountController {
  constructor(
    @inject(KEYS.AccountApplication)
    private readonly service: AccountApplicationService
  ){}

  @httpGet('/profile')
  async accountProfile(@request() req: Request, @response() res: Response) {
    this.service.sayHallo()
    return res.status(statusCode.OK).json(resp({ ping: "PONG!!!" }, 'Success'));
  }
}


// For bigger app, auth doesn't belong here
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