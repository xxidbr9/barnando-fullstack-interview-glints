import { v4 as uuid } from 'uuid'
import { IDataMapper } from "@core/domain/IDataMapper";
import { injectable } from "inversify";
import { RestaurantEntity } from "../domain";

@injectable()
export class RestaurantDataMapper implements IDataMapper<RestaurantEntity> {
  toDalEntity(dalEntity: RestaurantEntity): RestaurantEntity {
    const entity = new RestaurantEntity()
    entity.id = dalEntity.id || uuid()
    entity.name = dalEntity.name
    entity.address = dalEntity.address,
      entity.pictures = dalEntity.pictures
    return entity
  }

  toDomain(entity: RestaurantEntity): RestaurantEntity {
    return {
      id: entity.id,
      address: entity.address,
      name: entity.name,
      pictures: entity.pictures,
      schedules: entity.schedules,
      favoriteRestaurant: entity.favoriteRestaurant
    }
  }

}
