import { injectable } from 'inversify';
import { IDataMapper } from '@core/domain/IDataMapper';
import { AccountEntity } from '../domain';

// @injectable()
export class AccountDataMapper implements IDataMapper<AccountEntity> {
  toDomain(dalEntity: AccountEntity): AccountEntity {
    const entity = new AccountEntity()
    entity.id = dalEntity.id
    entity.email = dalEntity.email
    entity.fullName = dalEntity.fullName
    entity.password = dalEntity.password
    entity.pictureProfileUrl = dalEntity.pictureProfileUrl
    return entity
  }

  toDalEntity(entity: AccountEntity): AccountEntity {
    return {
      id: entity.id,
      email: entity.email,
      fullName: entity.fullName,
      password: entity.password,
      pictureProfileUrl: entity.pictureProfileUrl
    }
  }
}

