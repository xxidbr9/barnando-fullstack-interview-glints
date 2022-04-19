import { controller, httpGet, request, response } from 'inversify-express-utils';
import { Request, Response } from 'express';
import statusCode from 'http-status-codes';
import { okResp } from '@infrastructure/transport/http/processor'
import jwtParserMiddleware from '../middleware/jwtParser.middleware';

@controller('')
export class CommonController {
  @httpGet('/ping')
  async helloWorld(@request() req: Request, @response() res: Response) {
    return res.status(statusCode.OK).json(okResp({ ping: "PONG!!!" }, 'Success'));
  }

  @httpGet('/hello', jwtParserMiddleware)
  async testJwt(@request() req: Request, @response() res: Response) {
    console.log(req.body)
    return res.status(statusCode.OK).json(okResp({ ping: "PONG!!! from jwt", jwt_payload: req.body.jwt_payload }, 'Success'));
  }
}