import { AccountApplicationService } from "@app/account/service/account.service";
import { KEYS } from "@core/keys";
import { okResp } from "@infrastructure/transport/http/processor";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, request, response } from "inversify-express-utils";
import statusCode from 'http-status-codes'
import { ApplicationError } from "@core/domain/AppError";
import config from '@config/main'
import jwt from 'jsonwebtoken'
@controller('/api/v1/account')
export class AccountSocialController {
  constructor(
    @inject(KEYS.AccountApplication)
    private readonly service: AccountApplicationService
  ) { }

  @httpGet('/continue')
  async continueWithSocial(@request() req: Request, @response() res: Response) {
    // normally i do refresh token, short expire time for secure the access
    const accessToken = req.body.access_token
    if (!accessToken || accessToken === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "access_token are required")
    }

    const provider = req.body.provider
    if (!provider || provider === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "provider are required")
    }

    try {
      const userID = await this.service.continueWithSocial(accessToken, provider)
      const jwtData = jwt.sign({ user_id: userID }, config.JWT_SALT)
      return res.status(statusCode.OK).json(okResp({ access_token: jwtData }, 'success, but normally i do refresh_token, and a short expire time for secure the access'));
    } catch (err) {
      const error = err as { message: string }
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, error.message)
    }
  }
}

