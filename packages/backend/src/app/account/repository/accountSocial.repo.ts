import { IDataMapper } from "@core/domain/IDataMapper";
import { KEYS } from "@core/keys";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { AccountSocialEntity } from "../domain";
@injectable()
export class AccountSocialRepository {
  constructor(
    @inject(KEYS.PostgresDB) private readonly db: DataSource,
    @inject(KEYS.AccountSocialDataMapper) private readonly accountSocialDataMapper: IDataMapper<AccountSocialEntity>
  ) {
    this.repo = db.getRepository(AccountSocialEntity)
  }
  private repo: Repository<AccountSocialEntity>;

  async save(userSocial: AccountSocialEntity): Promise<AccountSocialEntity> {
    try {
      const newUserSocial = this.accountSocialDataMapper.toDalEntity(userSocial)
      return this.repo.save(newUserSocial)
    } catch (err) {
      throw new Error(err as any)
    }
  }

  async findByUserID(usertID: string): Promise<AccountSocialEntity | null> {
    const resp = await this.repo.findOne({
      where: {
        userID: usertID
      }
    })

    if (resp === null) {
      return null
    }

    return this.accountSocialDataMapper.toDomain(resp)
  }

  async findBySocialIDAndProvider(socialID: string, provider: string): Promise<AccountSocialEntity | null> {
    const resp = await this.repo.findOne({
      where: {
        socialID,
        provider,
      }
    })
    
    if (resp === null) {
      return null
    }

    return this.accountSocialDataMapper.toDomain(resp)
  }

}