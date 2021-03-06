import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React from 'react'
import GoogleOneTapLogin from 'react-google-one-tap-login'


interface IOneTap {
  clientId?: string
  credential?: string
  select_by?: string
}

type OneTapLoginProps = {
  isLogin: boolean
}

const OneTapLogin: React.FC<OneTapLoginProps> = (props) => {
  const router = useRouter()
  const _handleOneTapLogin = (oneTapData: IOneTap) => {
    const credentialsProvider = 'google-one-tap'
    signIn('credentials', {
      credential: oneTapData.credential,
      provider: credentialsProvider,
    })
  }

  const isOauthScreen =
    router.query?.from === 'facebook' || router.query?.from === 'google'

  const isOneTapShow = props.isLogin || isOauthScreen

  if (typeof window === "undefined") {
    return null
  }

  return (
    <GoogleOneTapLogin
      disabled={isOneTapShow}
      googleAccountConfigs={{
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        callback: _handleOneTapLogin,
      }}
    />
  )
}

export default OneTapLogin