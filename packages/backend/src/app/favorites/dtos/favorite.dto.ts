import { RestaurantEntity } from "@app/restaurant/domain"
import { FavoriteRestaurantEntity } from "../domain"
export class FavoriteBaseDto {
  constructor(
    public id: string,
    public name: string,
    public user_id: string,
    public parent_id: string | null,
  ) { }
}

export class FavoriteInfoDto extends FavoriteBaseDto {
  created_at: number
  updated_at?: number

  constructor(
    public id: string,
    public name: string,
    public user_id: string,
    public parent_id: string | null,
    createdAt: number | Date,
    updatedAt: number | Date | undefined,
  ) {
    super(id, name, user_id, parent_id)
    this.created_at = +createdAt
    if (!!updatedAt) {
      this.updated_at = +updatedAt
    }
  }
}


interface Restaurant {
  id: string;
  name: string;
  picture: string | null;
  address: string;
}
class FavoriteSingleRestaurant {
  public favorite_id: string
  public restaurant_id: string
  public adder_id: string
  public created_at: number
  public restaurant: Restaurant
  constructor(
    public id: string,
    favoriteID: string,
    restaurantID: string,
    adderID: string,
    createdAt: number | Date,
    restaurantBase: RestaurantEntity
  ) {
    this.favorite_id = favoriteID
    this.restaurant_id = restaurantID
    this.adder_id = adderID
    this.created_at = createdAt as number
    this.restaurant = {
      id: restaurantBase.id,
      name: restaurantBase.name,
      address: restaurantBase.address,
      picture: restaurantBase.pictures[0] || null
    }
  }
}
export class FavoriteDto {
  public user_id: string
  public parent_id: string | null
  public created_at: number
  public updated_at: number
  public favorite_restaurant?: FavoriteSingleRestaurant

  constructor(
    public id: string,
    public name: string,
    userID: string,
    parentID: string | null,
    createdAt: number,
    updatedAt: number,
    favoriteRestaurant: FavoriteRestaurantEntity
  ) {
    this.user_id = userID as string
    this.parent_id = parentID as string
    this.created_at = createdAt as number
    this.updated_at = updatedAt as number
    if (!!favoriteRestaurant) {
      this.favorite_restaurant = {
        id: favoriteRestaurant.id,
        adder_id: favoriteRestaurant.adderID,
        created_at: favoriteRestaurant.createdAt as number,
        favorite_id: favoriteRestaurant.favoriteID,
        restaurant: {
          id: favoriteRestaurant.restaurant.id,
          name: favoriteRestaurant.restaurant.name,
          address: favoriteRestaurant.restaurant.address,
          picture: favoriteRestaurant.restaurant.pictures[0] || null
        },
        restaurant_id: favoriteRestaurant.restaurantID
      }
    }
  }
}