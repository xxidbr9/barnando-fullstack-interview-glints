import { IDataMapper } from '@core/domain/IDataMapper'
import { injectable } from 'inversify'
import { v4 as uuid } from 'uuid'
import { FavoriteRestaurantEntity } from "../domain"

@injectable()
export class FavoriteRestaurantDataMapper implements IDataMapper<FavoriteRestaurantEntity> {
  toDalEntity(dalEntity: FavoriteRestaurantEntity): FavoriteRestaurantEntity {
    const entity = new FavoriteRestaurantEntity()
    entity.id = dalEntity.id || uuid()
    entity.createdAt = dalEntity.createdAt || Date.now()
    entity.adderID = dalEntity.adderID
    entity.favoriteID = dalEntity.favoriteID
    entity.restaurantID = dalEntity.restaurantID
    return entity
  }

  toDomain(entity: FavoriteRestaurantEntity): FavoriteRestaurantEntity {
    return {
      id: entity.id,
      adderID: entity.adderID,
      favoriteID: entity.favoriteID,
      restaurantID: entity.favoriteID,
      createdAt: entity.createdAt,
      restaurant: entity.restaurant,
      favorite: entity.favorite
    }
  }

}