import { IDataMapper } from '@core/domain/IDataMapper'
import { injectable } from 'inversify'
import { v4 as uuid } from 'uuid'
import { FavoriteEntity } from "../domain"

@injectable()
export class FavoriteDataMapper implements IDataMapper<FavoriteEntity> {
  toDalEntity(dalEntity: FavoriteEntity): FavoriteEntity {
    const entity = new FavoriteEntity()
    entity.id = dalEntity.id || uuid()
    entity.name = dalEntity.name
    entity.userID = dalEntity.userID
    entity.parentID = dalEntity.parentID
    entity.createdAt = dalEntity.createdAt
    entity.updatedAt = dalEntity.updatedAt || Date.now()
    return entity
  }

  toDomain(entity: FavoriteEntity): FavoriteEntity {
    return {
      id: entity.id,
      name: entity.name,
      userID: entity.userID,
      parentID: entity.parentID,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      favoriteRestaurants: entity.favoriteRestaurants
    }
  }

}