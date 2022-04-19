import { IOAuthProvider, IOAuth2Resp, IFacebookResp, IGoogleResp } from "@shared/types/accountSocial";
import axios from "axios";

// Get from facebook
async function getFromFacebook(accessToken: string): Promise<IOAuth2Resp> {
  const resp = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture.width(720).height(720)`)
  const userInfo = resp.data as IFacebookResp

  return {
    email: userInfo.email,
    id: userInfo.id,
    name: userInfo.name,
    picture: userInfo.picture.data.url
  }
}

// Get from Google
async function getFromGoogle(accessToken: string): Promise<IOAuth2Resp> {
  const resp = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
  const userInfo = resp.data as IGoogleResp

  return {
    email: userInfo.email,
    id: userInfo.id,
    name: userInfo.name,
    picture: userInfo.picture
  }
}



// Get from Google One Tap
async function getFromGoogleOneTap(accessToken: string): Promise<IOAuth2Resp> {
  const resp = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${accessToken}`)
  const userInfo = resp.data as IGoogleResp

  return {
    email: userInfo.email,
    id: userInfo.id,
    name: userInfo.name,
    picture: userInfo.picture
  }

}

async function getUserSocialInfoFromProvider(accessToken: string, provider: IOAuthProvider): Promise<IOAuth2Resp> {
  switch (provider) {
    case "facebook":
      return await getFromFacebook(accessToken)
    case "google":
      return await getFromGoogle(accessToken)
    case "google-one-tap":
      return await getFromGoogleOneTap(accessToken)

    default:
      throw Error("social provider are not valid")
  }
}

export default getUserSocialInfoFromProvider