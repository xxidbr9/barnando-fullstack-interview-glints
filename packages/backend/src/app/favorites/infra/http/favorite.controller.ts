import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils';
import { Request, Response } from 'express';
import statusCode from 'http-status-codes';
import { okResp } from '@infrastructure/transport/http/processor'
import { KEYS } from '@core/keys';
import { inject } from 'inversify';
import { AccountApplicationService } from '@app/account/service/account.service';
import { NotifierApplicationService } from '@app/notifier/service/notifier.service';
import { ApplicationError } from '@core/domain/AppError';
import { RestaurantApplicationService } from '@app/restaurant/services/restaurant.service';

@controller("/api/v1/favorites")
export class FavoritesController {
  constructor(
    @inject(KEYS.AccountApplication) private readonly accountService: AccountApplicationService,
    @inject(KEYS.RestaurantApplication) private readonly restaurantService: RestaurantApplicationService,
    @inject(KEYS.NotifierApplication) private readonly notifierService: NotifierApplicationService
  ) { }

  @httpGet("/")
  async getAllFavoritesCollection(@request() req: Request, @response() res: Response) {
    return res.status(statusCode.OK).json(okResp({ ping: "PONG!!!" }, 'Success'));
  }

  @httpGet("/:favorite_id")
  async getAllFavoriteDetail(@request() req: Request, @response() res: Response) {
    return res.status(statusCode.OK).json(okResp({ ping: "PONG!!!" }, 'Success'));
  }

  @httpPost("/create")
  async createNewFavorite(@request() req: Request, @response() res: Response) {
    return res.status(statusCode.OK).json(okResp({ ping: "PONG!!!" }, 'Success'));
  }

  @httpDelete('/:favorite_id')
  async removeFavorite(@request() req: Request, @response() res: Response) {
    return res.status(statusCode.OK).json(okResp({ ping: "PONG!!!" }, 'Success'));
  }

  @httpPut('/attach/:favorite_id')
  async addNewRestaurantToFavorite(@request() req: Request, @response() res: Response) {
    return res.status(statusCode.OK).json(okResp({ ping: "PONG!!!" }, 'Success'));
  }

  @httpPut('/detach/:favorite_id')
  async removeRestaurantFromFavorite(@request() req: Request, @response() res: Response) {
    return res.status(statusCode.OK).json(okResp({ ping: "PONG!!!" }, 'Success'));
  }

  @httpPost("/send-invitation")
  async sendInvitation(@request() req: Request, @response() res: Response) {
    const toEmail = req.body.to
    if (toEmail === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "email target are required")
    }

    const fromUserFullName = req.body.from
    if (fromUserFullName === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "sander name target are required")
    }

    const linkToFavorite = req.body.link_to
    if (linkToFavorite === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "link to favorite are required")
    }

    const favoriteName = req.body.favorite_name
    if (favoriteName === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "favorite name are required")
    }

    this.notifierService.sendInvitation(toEmail, fromUserFullName, linkToFavorite, favoriteName)

    return res.status(statusCode.OK).json(okResp({}, 'Success send an invitation to your friend email'));
  }

}
