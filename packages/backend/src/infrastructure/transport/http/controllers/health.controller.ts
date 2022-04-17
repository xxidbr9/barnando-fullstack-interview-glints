import { controller, httpGet, request, response } from 'inversify-express-utils';
import { Request, Response } from 'express';
import statusCode from 'http-status-codes';
import { resp } from '@infrastructure/transport/http/processor'

@controller('')
export class CommonController {
  @httpGet('/ping')
  async helloWorld(@request() req: Request, @response() res: Response) {
    return res.status(statusCode.OK).json(resp({ ping: "PONG!!!" }, 'Success'));
  }

}