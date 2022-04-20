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
import { FavoriteApplicationService } from '@app/favorites/services/favorites.service';
import jwtParserMiddleware from '@infrastructure/transport/http/middleware/jwtParser.middleware';

@controller("/api/v1/favorites", jwtParserMiddleware)
export class FavoritesController {
  constructor(
    @inject(KEYS.AccountApplication) private readonly accountService: AccountApplicationService,
    @inject(KEYS.RestaurantApplication) private readonly restaurantService: RestaurantApplicationService,
    @inject(KEYS.NotifierApplication) private readonly notifierService: NotifierApplicationService,
    @inject(KEYS.FavoriteApplication) private readonly service: FavoriteApplicationService
  ) { }

  @httpGet("/")
  async getAllFavoritesCollection(@request() req: Request, @response() res: Response) {
    const userID = req.body.jwt_payload.user_id
    const favoriteResp = await this.service.search(userID)
    return res.status(statusCode.OK).json(okResp(favoriteResp, 'success get all favorite'));
  }

  @httpGet("/:favorite_id")
  async getAllFavoriteDetail(@request() req: Request, @response() res: Response) {
    const userID = req.body.jwt_payload.user_id

    const favoriteCollectionID = req.params.favorite_id
    if (!favoriteCollectionID || favoriteCollectionID === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "favorite collection name id required")
    }

    const resp = await this.service.infoRestaurantInFavorite(favoriteCollectionID, userID)
    return res.status(statusCode.OK).json(okResp(resp, 'success get favorite collection detail'));
  }

  @httpPost("/create")
  async createNewFavorite(@request() req: Request, @response() res: Response) {
    const userID = req.body.jwt_payload.user_id
    const favoriteCollectionName = req.body.favorite_name
    if (!favoriteCollectionName || favoriteCollectionName === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "favorite collection name are required")
    }

    const resp = await this.service.createNewFavoriteCollection(favoriteCollectionName, userID)
    return res.status(statusCode.OK).json(okResp(resp, 'success add new favorite collection'));
  }

  @httpPut("/:favorite_id")
  async editFavorite(@request() req: Request, @response() res: Response) {
    const userID = req.body.jwt_payload.user_id
    const favoriteCollectionName = req.body.favorite_name
    if (!favoriteCollectionName || favoriteCollectionName === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "favorite collection name are required")
    }

    const favoriteCollectionID = req.params.favorite_id
    if (!favoriteCollectionID || favoriteCollectionID === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "favorite collection name id required")
    }

    const resp = await this.service.updateFavoriteCollection(favoriteCollectionName, favoriteCollectionID, userID)
    return res.status(statusCode.OK).json(okResp(resp, 'success edit favorite collection'));
  }

  @httpDelete('/:favorite_id')
  async removeFavorite(@request() req: Request, @response() res: Response) {
    const userID = req.body.jwt_payload.user_id

    const favoriteCollectionID = req.params.favorite_id
    if (!favoriteCollectionID || favoriteCollectionID === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "favorite collection name id required")
    }
    const resp = await this.service.deleteFavoriteCollection(favoriteCollectionID, userID)
    return res.status(statusCode.OK).json(okResp(resp, 'success delete favorite collection'));
  }

  @httpPut('/:favorite_id/attach')
  async addNewRestaurantToFavorite(@request() req: Request, @response() res: Response) {
    const userID = req.body.jwt_payload.user_id

    const favoriteCollectionID = req.params.favorite_id
    if (!favoriteCollectionID || favoriteCollectionID === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "favorite collection name id required")
    }

    const id = req.body.id as string
    if (!id || id === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "restaurant id required")
    }

    const resp = await this.service.attachRestaurantToFavoriteCollection(id, favoriteCollectionID, userID)

    return res.status(statusCode.OK).json(okResp(resp, 'success adding new favorite restaurant'));
  }

  @httpPut('/:favorite_id/detach')
  async removeRestaurantFromFavorite(@request() req: Request, @response() res: Response) {
    const userID = req.body.jwt_payload.user_id

    const favoriteCollectionID = req.params.favorite_id
    if (!favoriteCollectionID || favoriteCollectionID === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "favorite collection name id required")
    }

    const id = req.body.id as string
    if (!id || id === "") {
      throw new ApplicationError(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST, "restaurant id required")
    }

    const resp = await this.service.detachRestaurantToFavoriteCollection(id, favoriteCollectionID, userID)

    return res.status(statusCode.OK).json(okResp(resp, 'success delete restaurant from favorite'));
  }


  // send to other user email
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
