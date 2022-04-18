import { KEYS } from "@core/keys";
import { inject, injectable } from "inversify";
import { AccountRepository } from "../repository/account.repo";
import bcrypt from 'bcrypt'

/* 
? TODO ?
[ ] Register
[ ] Sign-in
[ ] Get-Profile
*/
@injectable()
export class AccountApplicationService {
  constructor(
    @inject(KEYS.AccountRepository)
    private readonly accountRepository: AccountRepository
  ) { }

  sayHallo() {
    console.log("haii")
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

    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) {
      throw new Error("wrong password")
    }

    return user.id
  }

}

