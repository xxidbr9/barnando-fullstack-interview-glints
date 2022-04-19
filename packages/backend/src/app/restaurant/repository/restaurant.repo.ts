import fs from 'fs'
import { KEYS } from "@core/keys";
import parseDay from "@shared/helpers/transformRestaurant";
import { NumberOfDayWeeks } from "@shared/types/day";
import { ISearchResponse } from "@shared/types/searchResponse";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { RestaurantEntity, RestaurantOpenTimeEntity } from "../domain";
import { RestaurantDataMapper } from "../mappers/restaurant.mapper";
import { RestaurantOpenTimeDataMapper } from "../mappers/restaurantOpenTime.mapper";
import { randAddress } from '@ngneat/falso';
import { faker } from '@faker-js/faker'
import axios from 'axios';
import sleep from '@shared/helpers/sleep';

@injectable()
export class RestaurantRepository {
  private restaurantRepo: Repository<RestaurantEntity>;
  private restaurantOpenTimeRepo: Repository<RestaurantOpenTimeEntity>;

  constructor(
    @inject(KEYS.PostgresDB) private readonly db: DataSource,
    @inject(KEYS.RestaurantDataMapper) private readonly restaurantDataMapper: RestaurantDataMapper,
    @inject(KEYS.RestaurantOpenTimeDataMapper) private readonly restaurantOpenTimeDataMapper: RestaurantOpenTimeDataMapper
  ) {
    this.restaurantRepo = db.getRepository(RestaurantEntity)
    this.restaurantOpenTimeRepo = db.getRepository(RestaurantOpenTimeEntity)
  }

  async save(restaurant: RestaurantEntity, openTimes: RestaurantOpenTimeEntity[]) {
    try {
      const newRestaurant = this.restaurantDataMapper.toDalEntity(restaurant)
      const savedRestaurant = await this.restaurantRepo.save(newRestaurant)

      let savedRestaurantOpenTimes: RestaurantOpenTimeEntity[] = []
      if (!!savedRestaurant) {

        openTimes.forEach(async (openTime) => {
          const newRestaurantOpenTime = this.restaurantOpenTimeDataMapper.toDalEntity({
            ...openTime,
            restaurantID: savedRestaurant.id
          })
          const savedRestaurantOpenTime = await this.restaurantOpenTimeRepo.save(newRestaurantOpenTime)
          savedRestaurantOpenTimes.push(savedRestaurantOpenTime)
        })

        return {
          id: savedRestaurant.id,
          address: savedRestaurant.address,
          name: savedRestaurant.name,
          dayOpens: savedRestaurantOpenTimes.map((time) => ({
            closeTime: time.closeTime,
            day: time.day,
            openTime: time.openTime
          })),
          pictures: savedRestaurant.pictures
        }
      } else {
        throw new Error("error race condition")
      }

    } catch (err) {
      throw new Error(err as any)
    }
  }

  /* 
  ? INFO ? 
  * Normally i do separate query and repo, 
  * separating `READ LOGIC` and `MANIPULATING LOGIC`.

  * And can be implement memory story like (Redis, MemCache, etc) 
  * for better performance reading data
  **/
  async search(q: string, days: NumberOfDayWeeks[], openTime: number, closeTime: number, limit: number, page: number): Promise<ISearchResponse<"restaurants", RestaurantEntity[]>> {
    let query = this.restaurantRepo.createQueryBuilder("restaurant")
      .leftJoinAndSelect(RestaurantOpenTimeEntity, "schedules", "schedules.restaurant_id = restaurant.id")

    if (!!q) {
      query = query.where("restaurant.name ILIKE :q", { q: `%${q}%` })
    }

    if (days.length > 0) {
      console.log(days)
      query = query.andWhere("schedules.day IN (:...days)", { days })
    }

    if (openTime > 0) {
      query = query.andWhere("schedules.open_time > :time", { time: openTime })
    }

    if (closeTime > 0) {
      query = query.andWhere("schedules.close_time > :time", { time: closeTime })
    }

    const total = await query.getCount()

    if (limit > 0) {
      console.log(limit)
      query = query.take(limit)
    }

    if (page > 0) {
      query = query.skip(page)
    }

    const results = await query.getMany()
    
    return {
      total,
      is_have_next: results.length >= limit,
      restaurants: results,
    }
  }

  async info(restaurantID: string) {
    let query = this.restaurantRepo.createQueryBuilder("restaurant")
      .leftJoinAndMapMany("restaurant.schedules", RestaurantOpenTimeEntity, "schedules", "schedules.restaurant_id = restaurant.id")
      .where("restaurant.id = :id", { id: restaurantID })

    return query.getOne()
  }


  // Seed here for bulk insert
  initialSeed() {
    const restaurant = new RestaurantEntity()
    restaurant.name = "Rumah makan padang minang menanti"
    restaurant.pictures = ["https://source.unsplash.com/random/?food"]
    restaurant.address = "Indonesia"
    restaurant.id = "restaurant_123"

    const restaurantOpenTimes: RestaurantOpenTimeEntity[] = []

    const days = parseDay("Mon-Sun 11 am - 10:30 pm")
    days.forEach(e => {
      const newRestaurantOpenTime = new RestaurantOpenTimeEntity()
      newRestaurantOpenTime.day = e.day
      newRestaurantOpenTime.openTime = e.openTime
      newRestaurantOpenTime.closeTime = e.closeTime
      newRestaurantOpenTime.restaurantID = restaurant.id
      restaurantOpenTimes.push(newRestaurantOpenTime)
    })

    this.save(restaurant, restaurantOpenTimes)
  }

  /* 
  ? TODO ?
  [ ] change env between prod and dev
  */
  async bulkInsert() {
    var data = fs.readFileSync(`${process.env.PWD}/src/assets/hours.csv`).toLocaleString();
    var rows = data.split("\n");
    type initialDataType = {
      name: string
      time: string
    }

    const restaurantList: initialDataType[] = []
    rows.forEach((row) => {
      const columns = row.split("\",");
      const newData: initialDataType = {
        name: columns[0].replaceAll(`\"`, ""),
        time: columns[1].replaceAll(`\"`, "")
      }
      restaurantList.push(newData)
    })

    const getRandomImage = async (url: string, index: number) => {
      if (index % 5 === 0) {
        await sleep(2000)
      }
      return await axios.get(url)
        .then((response) => response.request.res.responseUrl)
    }

    restaurantList.forEach(async (restaurant, index) => {
      const newRestaurant = new RestaurantEntity()
      newRestaurant.name = restaurant.name
      const { city, street, country, county } = randAddress()
      const address = [street, county, city, country].join(", ")
      newRestaurant.address = address
      newRestaurant.pictures = Array.from({ length: 5 }).map((_, i) => !(i % 2) ? faker.image.food() : "https://source.unsplash.com/random/?food")
      // newRestaurant.pictures = await Promise.all(Array.from({ length: 5 }).map((_, i) => getRandomImage(faker.image.food(), index)))
      const restaurantOpenTimes: RestaurantOpenTimeEntity[] = []
      const days = parseDay(restaurant.time)

      days.forEach(e => {
        const newRestaurantOpenTime = new RestaurantOpenTimeEntity()
        newRestaurantOpenTime.day = e.day
        newRestaurantOpenTime.openTime = e.openTime
        newRestaurantOpenTime.closeTime = e.closeTime
        restaurantOpenTimes.push(newRestaurantOpenTime)
      })

      await this.save(newRestaurant, restaurantOpenTimes)
    })
  }

  // the reason i do this, because i don't wont to migrate when app is initialize / place it in the server, so i do hits manually for minimize startup time
  async migrate() {
    const seedExist = await this.info("restaurant_123")
    if (!!seedExist) {
      return null
    }
    this.initialSeed()
    await this.bulkInsert()
  }
}
