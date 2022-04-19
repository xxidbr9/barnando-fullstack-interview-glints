import { IDataMapper } from "@core/domain/IDataMapper";
import { KEYS } from "@core/keys";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { AccountEntity } from "../domain";

@injectable()
export class AccountRepository {
  constructor(
    @inject(KEYS.PostgresDB) private readonly db: DataSource,
    @inject(KEYS.AccountDataMapper) private readonly accountDataMapper: IDataMapper<AccountEntity>
  ) {
    this.repo = db.getRepository(AccountEntity)
  }
  private repo: Repository<AccountEntity>;

  async save(user: AccountEntity): Promise<AccountEntity> {
    try {
      const newUser = this.accountDataMapper.toDalEntity(user)
      return this.repo.save(newUser)
    } catch (err) {
      throw new Error(err as any)
    }
  }

  async findByEmail(userEmail: string): Promise<AccountEntity | null> {
    const resp = await this.repo.findOne({
      where: {
        email: userEmail
      }
    })

    if (resp === null) {
      return null
    }

    return this.accountDataMapper.toDomain(resp)
  }

  async findByID(id: string): Promise<AccountEntity | null> {
    const resp = await this.repo.findOne({
      where: {
        id: id
      }
    })

    if (resp === null) {
      return null
    }

    return this.accountDataMapper.toDomain(resp)
  }
}