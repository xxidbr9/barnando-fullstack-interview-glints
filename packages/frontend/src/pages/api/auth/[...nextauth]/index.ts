import NextAuth, {
  Account,
  CallbacksOptions,
  NextAuthOptions,
  Profile,
  User,
} from 'next-auth'
import Providers from 'next-auth/providers'
import { AxiosResponse } from 'axios'
import { NetworkResponse, JWToken } from '@utils/types/network'
import { loginNetwork, continueWithSocialNetwork, profileNetwork } from '@networks/account.network'

interface IToken extends User {
  accessToken: string
}

const airProvider = Providers.Credentials({
  name: 'Credentials',
  authorize: async credentials => {
    try {
      let resp: AxiosResponse<NetworkResponse<JWToken>>
      if (credentials?.provider === 'credentials') {
        console.log(credentials)
        resp = await loginNetwork({
          email: credentials.email,
          password: credentials.password,
        })
      } else if (credentials?.provider === 'google-one-tap') {
        resp = await continueWithSocialNetwork({
          access_token: credentials.credential,
          provider: credentials.provider,
        })
      } else {
        throw new Error('sign-in provider are empty')
      }
      if (resp) {
        return {
          accessToken: resp.data.data.access_token,
        }
      }
    } catch (e) {
      const errorMessage = e.response.data.error
      throw new Error(errorMessage)
    }
  },
})

const facebookProvider = Providers.Facebook({
  clientId: process.env.NEXTAUTH_FACEBOOK_CLIENT_ID,
  clientSecret: process.env.NEXTAUTH_FACEBOOK_CLIENT_SECRET,
})

const googleProvider = Providers.Google({
  clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
  clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
})

const providers = [airProvider, facebookProvider, googleProvider]

const isSocial = (provider: string) => ['google', 'facebook'].includes(provider)

const callbacks: CallbacksOptions<Profile, Account> = {
  async signIn(_user, sign, _profile) {
    if (sign.type === 'credentials') {
      return true
    } else if (isSocial(sign?.provider)) {
      return true
    } else {
      return false
    }
  },
  async jwt(jwt, user, account) {
    if (isSocial(account?.provider)) {
      const respSocial = await continueWithSocialNetwork({
        access_token: account.accessToken,
        provider: account.provider,
      })

      jwt.accessToken = respSocial.data.data.access_token

      return jwt
    } else {
      if (user) {
        jwt.accessToken = user.accessToken
      }
      return jwt
    }
  },

  async session(session, token: IToken) {
    session.accessToken = token.accessToken
    const userProfile = await profileNetwork({
      access_token: session.accessToken as string,
    })

    /* For Get User Info */
    session.user.name = userProfile.data.data.profile.full_name
    session.user.email = userProfile.data.data.profile.email
    session.user.image = userProfile.data.data.profile.picture_profile_url

    return session
  },
}

const options: NextAuthOptions = {
  providers,
  callbacks,
  pages: {
    error: '/login',
  },
}

const handler = (req, res) => {
  const getData = NextAuth(req, res, options)
  return getData
}

export default handler