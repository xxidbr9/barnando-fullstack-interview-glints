import { KEYS } from "@core/keys";
import { inject, injectable } from "inversify";
import { IAccountRepository } from "../repository/IAccount.repo";

@injectable()
export class AccountApplicationService {
  constructor(
    @inject(KEYS.AccountApplication)
    private readonly accountRepository: IAccountRepository
  ) { }

}