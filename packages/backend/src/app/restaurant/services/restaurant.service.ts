import { ApplicationError } from "@core/domain/AppError";
import { KEYS } from "@core/keys";
import { NumberOfDayWeeks } from "@shared/types/day";
import { inject, injectable } from "inversify";
import moment from "moment";
import { RestaurantRepository } from "../repository/restaurant.repo";
import statusCode from 'http-status-codes'
import { RestaurantEntity, RestaurantOpenTimeEntity } from "../domain";
import parseDay from "@shared/helpers/transformRestaurant";
import { RestaurantDto, RestaurantSearchDto } from "../dtos/restaurant.dto";


/* 
? TODO ?
[ ] Add new Restaurant
[ ] Get All Restaurant
[ ] Get Restaurant info
*/
@injectable()
export class RestaurantApplicationService {

  constructor(
    @inject(KEYS.RestaurantRepository) private readonly restaurantRepository: RestaurantRepository,
  ) {
  }

  async search(q: string, days: NumberOfDayWeeks[], open: string, close: string, limit: number, page: number = 0) {
    let openTime: number = 0
    if (open !== null || open !== "") {
      openTime = moment(open, "hh:mm A").unix()
    }
    let closeTime: number = 0
    if (close !== null || close !== "") {
      closeTime = moment(close, "hh:mm A").unix()
    }

    if (limit <= 0 || !(limit)) {
      // limit = Number.MAX_VALUE
      limit = 40
    }

    if (page <= 0 || !(limit)) {
      page = 1
    }

    const result = await this.restaurantRepository.search(q, days, openTime, closeTime, limit, page)

    const restaurants = result.restaurants.map((restaurant) => new RestaurantSearchDto(restaurant.id, restaurant.name, restaurant.pictures, restaurant.address))

    return {
      ...result,
      restaurants
    }
  }

  async info(restaurantID: string) {
    const restaurantInfo = await this.restaurantRepository.info(restaurantID)
    if (restaurantInfo === null) {
      throw new ApplicationError(statusCode.NOT_FOUND, statusCode.NOT_FOUND, "restaurant with that id are not found")
    }

    return new RestaurantDto(restaurantInfo.id, restaurantInfo.name, restaurantInfo.pictures, restaurantInfo.address, restaurantInfo.schedules)
  }

  async migrate() {
    this.restaurantRepository.migrate()
  }


}
