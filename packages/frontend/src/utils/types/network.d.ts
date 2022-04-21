import { AxiosResponse } from "axios"

export interface ResponseSuccess<T> {
  data?: T | null,
  message?: string,
  status?: number
}

export interface ResponseFail {
  status?: number
  error?: Error | string
}

export interface NetworkResponse<T> extends ResponseSuccess<T>, ResponseFail { }


export interface ISearchRequest {
  q?: string
  page?: number
  limit?: number
}

export type AuthorizationType = string

export type JWToken = {
  access_token: string
}

export interface IAuthTokenHeader extends JWToken { }

export interface NetworkPromise<T> extends Promise<AxiosResponse<NetworkResponse<T>>> { }