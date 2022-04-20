import { FavoriteRestaurantEntity } from "../domain";

export class FavoriteRestaurantDto {

  constructor(
    public id: string,
    public created_at: number,
    public adder_id: string,
    public favorite_id: string,
    public restaurant_id: string
  ) {
  }
}


interface Restaurant {
  id: string;
  name: string;
  pictures: string[];
  address: string;
}


export class FavoriteRestaurant {
  public favorite_id: string
  public restaurant_id: string
  public adder_id: string
  public created_at: number
  constructor(id: string,
    favoriteID: string,
    restaurantID: string,
    adderID: string,
    createdAt: number | Date,
    public restaurant: Restaurant
  ) {
    this.favorite_id = favoriteID
    this.restaurant_id = restaurantID
    this.adder_id = adderID
    this.created_at = createdAt as number
  }
}


export class InfoFavoriteRestaurantDto {
  public user_id: string
  public parent_id: string | null
  public created_at: number
  public updated_at: number
  public favorite_restaurants: FavoriteRestaurant[]

  constructor(
    public id: string,
    public name: string,
    userID: string,
    parentID: string | null,
    createdAt: number,
    updatedAt: number,
    favoriteRestaurants: FavoriteRestaurantEntity[]
  ) {
    this.user_id = userID as string
    this.parent_id = parentID as string
    this.created_at = createdAt as number
    this.updated_at = updatedAt as number
    this.favorite_restaurants = favoriteRestaurants.map(favorite_restaurant => new FavoriteRestaurant(favorite_restaurant.id, favorite_restaurant.favoriteID, favorite_restaurant.restaurantID, favorite_restaurant.adderID, favorite_restaurant.createdAt, favorite_restaurant.restaurant))
  }
}