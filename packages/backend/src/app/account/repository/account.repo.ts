import { IDataMapper } from "@core/domain/IDataMapper";
import { KEYS } from "@core/keys";
import { inject, injectable } from "inversify";
import { DataSource } from "typeorm";
import { AccountEntity } from "../domain";

@injectable()
export class AccountRepository {
  constructor(
    @inject(KEYS.PostgresDB) private readonly db: DataSource,
    @inject(KEYS.AccountDataMapper) private readonly accountDataMapper: IDataMapper<AccountEntity>
  ) {
    // super(db.collection('users'), userDataMapper);

  }
}