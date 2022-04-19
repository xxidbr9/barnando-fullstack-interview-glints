import { DBTestHelper } from "@shared/helpers/testHelper";
import parseDay from "@shared/helpers/transformRestaurant";
import { RestaurantEntity, RestaurantOpenTimeEntity } from "../domain";

let DB: DBTestHelper

beforeAll(async () => {
  DB = await new DBTestHelper([RestaurantEntity, RestaurantOpenTimeEntity]).setupTestDB()
})

afterAll(() => {
  DB.teardownTestDB()
})

describe("Test all restaurant domain", () => {
  let restaurant: RestaurantEntity

  test("test create new restaurant", async () => {
    const restaurantEntity = new RestaurantEntity()
    restaurantEntity.address = "Singapore"
    restaurantEntity.id = "restaurant_id_123"
    restaurantEntity.name = "Es Teh"
    restaurantEntity.pictures = ["https://source.unsplash.com/random/restaurant"]

    restaurant = await DB
      .dbConnect
      .manager
      .save(restaurantEntity)

    expect(restaurant).toEqual(restaurantEntity)

  })

  test("test add restaurant open time", async () => {
    const restaurantOpenTime = new RestaurantOpenTimeEntity()
    const schedule = "Sun 11 am - 10:30 pm";
    const daysSchedule = parseDay(schedule)
    daysSchedule.map((s) => {
      restaurantOpenTime.openTime = s
        .openTime
      restaurantOpenTime.closeTime = s
        .closeTime
      restaurantOpenTime.day = s.day
      restaurantOpenTime.id = "id_123"
      restaurantOpenTime.restaurantID = restaurant.id
    })

    const resp = await DB
      .dbConnect
      .manager
      .save(restaurantOpenTime)
    expect(resp).toEqual(restaurantOpenTime)
  })

})