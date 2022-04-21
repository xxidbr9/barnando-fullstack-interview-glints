import { IFavoriteBodyRequest, IFavoriteBodyResponse, IFavoriteRestaurantBodyRequest } from "@models/favorte.model"
import { authHeaderDto } from "@utils/helpers/networkHelper"
import airAxios from "@utils/libs/axios"
import { IAuthTokenHeader, NetworkPromise } from "@utils/types/network"

const FAVORITE_URL = "/api/v1/favorite"

export function createFavoriteNetwork(
  token: IAuthTokenHeader,
  body: IFavoriteBodyRequest
): NetworkPromise<IFavoriteBodyResponse> {
  return airAxios({
    url: `${FAVORITE_URL}/create`,
    method: "POST",
    data: body,
    headers: {
      ...authHeaderDto(token)
    }
  })
}

export function deleteFavoriteNetwork(
  token: IAuthTokenHeader,
  id: string
): NetworkPromise<{ effected: number }> {
  return airAxios({
    url: `${FAVORITE_URL}/${id}`,
    method: "DELETE",
    headers: {
      ...authHeaderDto(token)
    }
  })
}


export function editFavoriteNetwork(
  token: IAuthTokenHeader,
  id: string,
  body: IFavoriteBodyRequest
): NetworkPromise<IFavoriteBodyResponse> {
  return airAxios({
    url: `${FAVORITE_URL}/${id}`,
    method: "PUT",
    data: body,
    headers: {
      ...authHeaderDto(token)
    }
  })
}

export function attachToFavoriteNetwork(
  token: IAuthTokenHeader,
  id: string,
  body: IFavoriteRestaurantBodyRequest
): NetworkPromise<IFavoriteBodyResponse> {
  return airAxios({
    url: `${FAVORITE_URL}/${id}/attach`,
    method: "PUT",
    data: body,
    headers: {
      ...authHeaderDto(token)
    }
  })
}

export function detachToFavoriteNetwork(
  token: IAuthTokenHeader,
  id: string,
  body: IFavoriteRestaurantBodyRequest
): NetworkPromise<IFavoriteBodyResponse> {
  return airAxios({
    url: `${FAVORITE_URL}/${id}/detach`,
    method: "PUT",
    data: body,
    headers: {
      ...authHeaderDto(token)
    }
  })
}

export function searchFromFavoriteNetwork(
  token: IAuthTokenHeader
): NetworkPromise<IFavoriteBodyResponse> {
  return airAxios({
    url: `${FAVORITE_URL}`,
    method: "GET",
    headers: {
      ...authHeaderDto(token)
    }
  })
}

export function infoFavoriteNetwork(
  token: IAuthTokenHeader,
  id: string,
): NetworkPromise<IFavoriteBodyResponse> {
  return airAxios({
    url: `${FAVORITE_URL}/${id}`,
    method: "GET",
    headers: {
      ...authHeaderDto(token)
    }
  })
}