import { IAuthTokenHeader } from "@utils/types/network";


export function authHeaderDto(token: IAuthTokenHeader) {
  return {
    Authorization: `Bearer ${token.access_token}`
  }
}