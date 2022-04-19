import { injectable } from 'inversify';
import { IDataMapper } from '@core/domain/IDataMapper';
import { AccountEntity } from '../domain';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt'

@injectable()
export class AccountDataMapper implements IDataMapper<AccountEntity> {
  toDalEntity(dalEntity: AccountEntity): AccountEntity {
    const entity = new AccountEntity()
    entity.id = dalEntity.id || uuid()
    entity.email = dalEntity.email
    entity.fullName = dalEntity.fullName
    if (dalEntity.password !== null) {
      entity.password = bcrypt.hashSync(dalEntity.password as string, bcrypt.genSaltSync(4))
    }
    entity.pictureProfileUrl = dalEntity.pictureProfileUrl
    return entity
  }

  toDomain(entity: AccountEntity): AccountEntity {
    return {
      id: entity.id,
      email: entity.email,
      fullName: entity.fullName,
      password: entity.password,
      pictureProfileUrl: entity.pictureProfileUrl
    }
  }
}

