import React, { useEffect, useState } from 'react'
import { signOut, useSession, signIn } from 'next-auth/client'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import ROUTES_CONSTANT from '@utils/constants/routes'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const [session, loading] = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

  if (loading) {
    return <div>Loading ....</div>
  }

  return (
    <div>
      <p>Hallo {session?.user.name} from session</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <div className="flex gap-2">
        <Link href="/login" passHref>
          <a>Masuk</a>
        </Link>
        <button onClick={() => signOut({ callbackUrl: ROUTES_CONSTANT.HOME })}>Keluar</button>
        <button onClick={() => signIn("facebook")}>Masuk Facebook</button>
        <button onClick={() => signIn("google")}>Masuk Google</button>

      </div>
    </div>
  )
}

export default ProfilePage
