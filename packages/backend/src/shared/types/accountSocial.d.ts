export type IOAuthProvider = "facebook" | "google" | "google-one-tap"

type FacebookPicture = {
  data: {
    height: number;
    is_silhouette: boolean;
    url: string;
    width: number;
  }
}

export type IFacebookResp = {
  email: string;
  id: string;
  name: string;
  picture: FacebookPicture;
}

// Google
export type IGoogleResp = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

// Google One Tap
export type IGoogleOneTapResp = {
  iss: string
  nbf: string
  aud: string
  sub: string
  email: string
  email_verified: string
  azp: string
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: string
  exp: string
  jti: string
  alg: string
  kid: string
  typ: string
}

// OAuth2
export type IOAuth2Resp = {
  id: string
  name: string
  email: string
  picture: string
}