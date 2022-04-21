import { IRestaurantInfoResponse, IRestaurantResponse } from "@models/restaurant.model";
import airAxios from "@utils/libs/axios";
import { ISearchRequest, NetworkPromise } from "@utils/types/network";


type IParams = ISearchRequest & {
  open?: string,
  close?: string,
  day_open?: string
}

const RESTAURANT_URL = "/api/v1/restaurant"

export function searchRestaurantNetwork(
  params?: IParams
): NetworkPromise<IRestaurantResponse> {
  return airAxios({
    params,
    url: RESTAURANT_URL,
    method: "GET",
  })
}

export function infoRestaurantNetwork(
  id: string
): NetworkPromise<IRestaurantInfoResponse> {
  return airAxios({
    url: `${RESTAURANT_URL}/${id}`,
    method: "GET",
  })
}
