import { okResp } from "@infrastructure/transport/http/processor";
import { Request, Response } from "express";
import { controller, httpGet, request, response } from "inversify-express-utils";
import statusCode from 'http-status-codes';
import { KEYS } from "@core/keys";
import { inject } from "inversify";
import { NumberOfDayWeeks } from "@shared/types/day";
import { RestaurantApplicationService } from "@app/restaurant/services/restaurant.service";


@controller('/api/v1/restaurant')
export class RestaurantController {
  constructor(
    @inject(KEYS.RestaurantApplication) private readonly service: RestaurantApplicationService
  ) { }

  @httpGet('/')
  async searchRestaurant(@request() req: Request, @response() res: Response) {

    const openTime = req.query?.open as string
    const closeTime = req.query?.close as string

    const days: NumberOfDayWeeks[] = []
    const dayOpen = req.query.day_open as string
    if (!!dayOpen) {
      const listDayOpen = dayOpen.split(",").map(e => parseInt(e) as NumberOfDayWeeks)
      listDayOpen.forEach(day => days.push(day))
    }

    const search = req.query.q as string

    const limit = req.query.limit as string
    const page = req.query.page as string

    const restaurantResp = await this.service.search(search, days, openTime, closeTime, parseInt(limit), +page)
    return res.status(statusCode.OK).json(okResp(restaurantResp, 'success get user all restaurant'));
  }

  @httpGet('/migrate')
  async migrate(@request() req: Request, @response() res: Response) {
    await this.service.migrate()
    return res.status(statusCode.OK).json(okResp({}, 'success get info restaurant'));
  }

  @httpGet('/:id')
  async infoRestaurant(@request() req: Request, @response() res: Response) {
    const restaurantID = req.params?.id as string
    const restaurantResp = await this.service.info(restaurantID)
    return res.status(statusCode.OK).json(okResp({ restaurant: restaurantResp }, 'success get info restaurant'));
  }


}