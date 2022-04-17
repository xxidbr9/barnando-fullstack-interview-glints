import { KEYS } from "@core/keys";
import { inject, injectable } from "inversify";
import { IAccountRepository } from "../repository/IAccount.repo";


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
    private readonly accountRepository: IAccountRepository
  ) { }

  sayHallo() {
    console.log("haii")
  }

}

