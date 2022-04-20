import { AccountEntity } from "@app/account/domain";
import { RestaurantEntity, RestaurantOpenTimeEntity } from "@app/restaurant/domain";
import { KEYS } from "@core/keys";
import { ISearchResponse } from "@shared/types/searchResponse";
import { query } from "express";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { FavoriteEntity, FavoriteRestaurantEntity } from "../domain";
import { FavoriteDataMapper } from "../mappers/favorite.mapper";
import { FavoriteRestaurantDataMapper } from "../mappers/favoriteRestaurant.mapper";


/* 
? TODO ? 
[X] create a and edit favorite collection
[X] delete favorite collection
[X] showing all existed favorite collection
[X] add a new restaurant to favorite collection
[X] remove restaurant from favorite
[ ] showing all restaurant in favorite collection
[ ] clone collection with parent id
*/

@injectable()
export class FavoriteRepository {
  private favoriteRepo: Repository<FavoriteEntity>
  private favoriteRestaurantRepo: Repository<FavoriteRestaurantEntity>

  constructor(
    @inject(KEYS.PostgresDB) private readonly db: DataSource,
    @inject(KEYS.FavoriteDataMapper) private favoriteDataMapper: FavoriteDataMapper,
    @inject(KEYS.FavoriteRestaurantDataMapper) private favoriteRestaurantDataMapper: FavoriteRestaurantDataMapper

  ) {
    this.favoriteRepo = db.getRepository(FavoriteEntity)
    this.favoriteRestaurantRepo = db.getRepository(FavoriteRestaurantEntity)

  }

  //  create a and edit favorite collection
  async save(favorite: FavoriteEntity) {
    try {
      const newFavoriteCollection = this.favoriteDataMapper.toDalEntity(favorite)
      return this.favoriteRepo.save(newFavoriteCollection)
    } catch (err) {
      throw new Error(err as any)
    }
  }

  // delete favorite collection
  async deleteFavorite(favoriteID: string, userID: string) {
    return this.favoriteRepo.createQueryBuilder("")
      .where("user_favorite.id = :id", { id: favoriteID })
      .andWhere("user_favorite.user_id = :userID", { userID })
      .delete()
      .execute();
  }


  async findByID(favoriteID: string, userID: string) {
    const query = this.favoriteRepo.createQueryBuilder("favorite")
      .where("favorite.id = :favoriteID", { favoriteID })
      .andWhere("favorite.user_id = :userID", { userID })

    return await query.getOne()
  }

  // showing all existed favorite collection
  async searchFavorite(userID: string): Promise<ISearchResponse<"favorites", FavoriteEntity[]>> {
    let query = this.favoriteRepo.createQueryBuilder("favorite")
      .leftJoinAndMapOne("favorite.favoriteRestaurants",FavoriteRestaurantEntity, "favoriteRestaurant", "favoriteRestaurant.favorite_id = favorite.id")
      .leftJoinAndMapOne("favoriteRestaurant.restaurant", RestaurantEntity, "restaurant", "restaurant.id = favoriteRestaurant.restaurant_id")
      .where("favorite.user_id = :userID", { userID })
      .orderBy("favorite.updated_at", "DESC")

    const total = await query.getCount()
    const result = await query.getMany()
    return {
      total,
      favorites: result,
    }
  }

  // add a new restaurant to favorite collection
  async addRestaurantToFavorite(favoriteRestaurant: FavoriteRestaurantEntity, userID: string) {
    try {
      const finnedRestaurant = await this.findRestaurantInCollectionByID(favoriteRestaurant.favoriteID, favoriteRestaurant.restaurantID, userID)
      if (finnedRestaurant !== null) throw new Error("the same restaurant is exist")

      const newFavoriteRestaurant = this.favoriteRestaurantDataMapper.toDalEntity(favoriteRestaurant)
      return this.favoriteRestaurantRepo.save(newFavoriteRestaurant)

    } catch (err) {
      throw new Error(err as any)
    }

  }

  //  remove restaurant from favorite
  async removeRestaurantFromFavorite(favoriteRestaurant: FavoriteRestaurantEntity, userID: string) {
    try {
      const finnedRestaurant = await this.findRestaurantInCollectionByID(favoriteRestaurant.favoriteID, favoriteRestaurant.restaurantID, userID)
      if (finnedRestaurant === null) throw new Error("the same restaurant doesn't exist")

      return this.favoriteRestaurantRepo.createQueryBuilder("user_favorite_restaurant")
        .where("user_favorite_restaurant.favorite_id = :favoriteID", { favoriteID: favoriteRestaurant.favoriteID })
        .andWhere("user_favorite_restaurant.restaurant_id = :restaurantID", { restaurantID: favoriteRestaurant.restaurantID })
        .delete()
        .execute()

    } catch (err) {
      throw new Error(err as any)
    }
  }

  // find restaurant in favorites collection
  private async findRestaurantInCollectionByID(favoriteID: string, restaurantID: string, userID: string) {
    const query = this.favoriteRepo.createQueryBuilder("favorite")
      .where("favorite.id = :favoriteID", { favoriteID })
      .leftJoinAndSelect(FavoriteRestaurantEntity, "favoriteRestaurant", "favoriteRestaurant.favorite_id = favorite.id")
      .andWhere("favoriteRestaurant.restaurant_id = :restaurantID", { restaurantID })
      .andWhere("favorite.user_id = :userID", { userID })

    return await query.getOne()
  }

  // showing all restaurant in favorite collection
  // TODO
  async infoSearchRestaurantInFavorite(favoriteID: string, userID: string) {
    let query = this.favoriteRepo.createQueryBuilder("favorite")
      .where("favorite.id = :favoriteID", { favoriteID })
      .andWhere("favorite.user_id = :userID", { userID })
      .leftJoinAndMapMany("favorite.favoriteRestaurants", FavoriteRestaurantEntity, "favoriteRestaurants", "favoriteRestaurants.favorite_id = favorite.id")
      .leftJoinAndMapOne("favoriteRestaurants.restaurant", RestaurantEntity, "restaurant", "restaurant.id = favoriteRestaurants.restaurant_id")

    const total = await query.getCount()
    const favorite = await query.getOne()
    return {
      total,
      favorite
    }
  }

  // clone collection with parent id
  // TODO
  async createNewFavoriteFromExistedFavorite() {

  }

}