import NextAuth from "next-auth"

declare module "next-auth" {

  interface Session {
    user: {
      name: string
      email: string
      picture_profile_url: string
      id: string
    }
  }
}