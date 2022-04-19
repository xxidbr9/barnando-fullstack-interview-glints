import { v4 as uuid } from 'uuid'
import { IDataMapper } from "@core/domain/IDataMapper";
import { injectable } from "inversify";
import { RestaurantOpenTimeEntity } from "../domain";

@injectable()
export class RestaurantOpenTimeDataMapper implements IDataMapper<RestaurantOpenTimeEntity> {
  toDalEntity(dalEntity: RestaurantOpenTimeEntity): RestaurantOpenTimeEntity {
    const entity = new RestaurantOpenTimeEntity()
    entity.id = dalEntity.id || uuid()
    entity.restaurantID = dalEntity.restaurantID
    entity.closeTime = dalEntity.closeTime
    entity.openTime = dalEntity.openTime
    entity.day = dalEntity.day
    return entity
  }

  toDomain(entity: RestaurantOpenTimeEntity): RestaurantOpenTimeEntity {
    return {
      id: entity.id,
      day: entity.day,
      openTime: entity.openTime,
      closeTime: entity.closeTime,
      restaurantID: entity.restaurantID,
      restaurant: entity.restaurant
    }
  }

}
