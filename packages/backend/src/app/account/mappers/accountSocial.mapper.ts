import { injectable } from 'inversify';
import { IDataMapper } from '@core/domain/IDataMapper';
import { AccountSocialEntity } from '../domain';

@injectable()
export class AccountSocialDataMapper implements IDataMapper<AccountSocialEntity> {
  toDalEntity(dalEntity: AccountSocialEntity): AccountSocialEntity {
    const entity = new AccountSocialEntity()
    entity.provider = dalEntity.provider
    entity.socialID = dalEntity.socialID
    entity.userID = dalEntity.userID
    return entity
  }

  toDomain(entity: AccountSocialEntity): AccountSocialEntity {
    return {
      provider: entity.provider,
      socialID: entity.socialID,
      userID: entity.userID
    }
  }
}

