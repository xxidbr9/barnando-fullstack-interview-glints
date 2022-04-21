import { IAuthHeader } from "@utils/types/network";

export function authHeaderDto(headers: IAuthHeader) {
  return {
    Authorization: `Bearer ${headers.access_token}`
  }
}