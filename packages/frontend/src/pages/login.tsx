import ROUTES_CONSTANT from '@utils/constants/routes';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/client'
import useSWR from 'swr';


/**
 * THIS IS SIMPLE EXAMPLE FOR HANDLE NETWROK / REST:API
 *  */
const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()


  const _handleLogin = async (data) => {
    console.log(data)
    signIn("credentials", {
      email: data.email,
      password: data.password,
      provider: "credentials",
      callbackUrl: "/example"
    })
  }


  return (
    <div>
      <form onSubmit={handleSubmit(_handleLogin)}>
        <input type="text" {...register("email", { required: true })} className="border-2" />
        <input type="text" {...register("password", { required: true })} className="border-2" />
        <button type="submit">Masuk</button>
        <Link href={ROUTES_CONSTANT.HOME}>
          Go Home
        </Link>
      </form>
    </div>
  )
}

export default LoginPage
