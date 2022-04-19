import { AccountEntity } from "@app/account/domain";
import { RestaurantEntity, RestaurantOpenTimeEntity } from "@app/restaurant/domain";
import { DBTestHelper } from "@shared/helpers/testHelper";
import parseDay from "@shared/helpers/transformRestaurant";
import moment from "moment";
import { FavoriteEntity, FavoriteRestaurantEntity } from "../domain";

let DB: DBTestHelper
let restaurant: RestaurantEntity
let user: AccountEntity

beforeAll(async () => {
  DB = await new DBTestHelper([FavoriteEntity, FavoriteRestaurantEntity, RestaurantOpenTimeEntity, RestaurantEntity, AccountEntity]).setupTestDB()

  // create the restaurant first
  const restaurantEntity = new RestaurantEntity()
  restaurantEntity.id = "ID123"
  restaurantEntity.address = "Solo"
  restaurantEntity.name = "Sushi Wasabi"
  restaurantEntity.pictures = ["https://source.unsplash.com/random/sushi"]

  restaurant = await DB.dbConnect.manager.save(restaurantEntity)


  // create initial user
  const accountEntity = new AccountEntity()
  accountEntity.id = "USER_ID_123"
  accountEntity.email = "barnando13@gmail.com"
  accountEntity.fullName = "Barnando Akbarto Hidayatullah"
  accountEntity.password = "qwerty"
  accountEntity.pictureProfileUrl = "https://source.unsplash.com/random/picture"

  user = await DB.dbConnect.manager.save(accountEntity)
})

afterAll(() => {
  // DB.teardownTestDB()
})

describe("Test all favorite entity", () => {
  let favorite: FavoriteEntity

  test("create new user Favorite", async () => {
    const fav = new FavoriteEntity()
    fav.id = "fav_123"
    fav.name = "Tasty Restaurant"
    fav.userID = user.id
    fav.createAt = Date.now()

    const repo = DB.dbConnect.getRepository(FavoriteEntity)

    favorite = await repo.save(fav)

    expect(favorite).toEqual(fav)
  })

  test("add favorite restaurant", async () => {
    const favRestaurant = new FavoriteRestaurantEntity()
    favRestaurant.favoriteID = favorite.id
    favRestaurant.restaurantID = restaurant.id
    favRestaurant.id = "fav_restaurant_123"
    favRestaurant.createAt = Date.now()

    const repo = DB.dbConnect.getRepository(FavoriteRestaurantEntity)

    const resp = await repo.save(favRestaurant)

    expect(resp).toEqual(favRestaurant)
  })
})