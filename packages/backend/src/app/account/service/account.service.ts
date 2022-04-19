import { KEYS } from "@core/keys";
import { inject, injectable } from "inversify";
import { AccountRepository } from "../repository/account.repo";
import bcrypt from 'bcrypt'
import { AccountDto } from "../dtos/account.dto";
import { AccountSocialRepository } from "../repository/accountSocial.repo";
import { IOAuthProvider } from "@shared/types/accountSocial";
import getUserSocialInfoFromProvider from "@shared/helpers/socialOAuth2.helper";
import { ApplicationError } from "@core/domain/AppError";
import statusCode from 'http-status-codes';

/* 
? TODO ?
[X] Register
[X] Sign-in
[X] Get-Profile
[X] Social Auth
*/
@injectable()
export class AccountApplicationService {
  constructor(
    @inject(KEYS.AccountRepository) private readonly accountRepository: AccountRepository,
    @inject(KEYS.AccountSocialRepository) private readonly accountSocialRepository: AccountSocialRepository
  ) { }

  async profile(userID: string) {
    const user = await this.accountRepository.findByID(userID)
    return new AccountDto(user?.id as string, user?.fullName as string, user?.email as string, user?.pictureProfileUrl as string)
  }

  async register(email: string, password: string, fullName: string) {

    const finnedEmail = await this.accountRepository.findByEmail(email)
    if (finnedEmail !== null) {
      throw new Error("user with that email already exist")
    }

    await this.accountRepository.save({
      email,
      fullName,
      password,
    })
  }

  async login(email: string, password: string,) {

    const user = await this.accountRepository.findByEmail(email)
    if (!user) {
      throw new Error("email not registered")
    }

    const isValid = bcrypt.compareSync(password, user.password as string)
    if (!isValid) {
      throw new Error("wrong password")
    }

    return user.id
  }

  async continueWithSocial(accessToken: string, provider: IOAuthProvider) {

    try {
      const getUserInfo = await getUserSocialInfoFromProvider(accessToken, provider)
      const finnedUser = await this.accountSocialRepository.findBySocialIDAndProvider(getUserInfo.id, provider as string)

      if (finnedUser !== null) {
        return finnedUser.userID
      }

      const existedUser = await this.accountRepository.findByEmail(getUserInfo.email)
      if (existedUser !== null) {
        const newSocialUser = await this.accountSocialRepository.save({
          provider: provider,
          socialID: getUserInfo.id,
          userID: existedUser.id as string
        })
        return newSocialUser.userID
      }

      const newUser = await this.accountRepository.save({
        email: getUserInfo.email,
        fullName: getUserInfo.name,
        pictureProfileUrl: getUserInfo.picture,
      })

      const newUserSocial = await this.accountSocialRepository.save({
        provider: provider as string,
        socialID: getUserInfo.id,
        userID: newUser.id as string
      })

      return newUserSocial.userID

    } catch (err) {
      throw new ApplicationError(statusCode.INTERNAL_SERVER_ERROR, statusCode.INTERNAL_SERVER_ERROR, err as string)
    }
  }

}

