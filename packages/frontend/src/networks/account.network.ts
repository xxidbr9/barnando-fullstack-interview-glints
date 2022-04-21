import { authHeaderDto } from "@utils/helpers/networkHelper";
import airAxios from "@utils/libs/axios";
import { IAuthTokenHeader, NetworkPromise } from "@utils/types/network";
import { ILoginBodyRequest, ILoginResponse, IOauthRequest, IProfileResponse, IRegisterRequest } from "@models/account.model";

export function loginNetwork(body: ILoginBodyRequest): NetworkPromise<ILoginResponse> {
  return airAxios({
    url: "/api/v1/auth/login",
    method: "POST",
    data: {
      ...body
    }
  })
}

export function registerNetwork(body: IRegisterRequest): NetworkPromise<null> {
  return airAxios({
    url: "/api/v1/auth/register",
    method: "POST",
    data: body
  })
}

export function profileNetwork(token: IAuthTokenHeader): NetworkPromise<IProfileResponse> {
  return airAxios({
    url: "/api/v1/account/profile",
    method: "GET",
    headers: {
      ...authHeaderDto(token)
    }
  })
}

export function continueWithSocialNetwork(body: IOauthRequest): NetworkPromise<ILoginResponse> {
  return airAxios({
    url: "/api/v1/oauth/social",
    method: "POST",
    data: body
  })
}