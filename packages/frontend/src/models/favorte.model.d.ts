import { IRestaurant } from "./restaurant.model"

export type IFavoriteBodyRequest = {
  favorite_name: string
}

export type IFavorite = {
  id: string
  name: string
  user_id: string
  parent_id?: any

}

export type IFavoriteBodyResponse = IFavorite & {
  created_at: number
  updated_at: number
}

export type IFavoriteRestaurantBodyRequest = {
  id: string
}

type IFavoriteRestaurant = {
  favorite_id: string;
  restaurant_id: string;
  adder_id: string;
  created_at: string;
}

export type IFavoriteRestaurantResponse = {
  id: string;
} & IFavoriteRestaurant


export type IFavoriteSearchResponse = {
  total: number;
  favorites: IFavorite[];
}

export type IFavoriteRestaurantFull = {
  restaurant: IRestaurant;
} & IFavoriteRestaurant

export interface RootObject {
  id: string;
  name: string;
  user_id: string;
  parent_id?: any;
  created_at: string;
  updated_at: string;
  favorite_restaurants: IFavoriteRestaurantFull[];
}