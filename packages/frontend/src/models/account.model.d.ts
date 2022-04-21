export type ILoginBodyRequest = {
  email: string
  password: string
}

export type ILoginResponse = {
  access_token: string
}

export type IRegisterRequest = {
  email: string
  password: string
  full_name: string
}

export type IProfile = {
  id: string
  full_name: string
  email: string
  picture_profile_url?: string
}

export type IProfileResponse = {
  profile: IProfile
}

export type IOauthRequest = {
  access_token: string
  provider: string
}