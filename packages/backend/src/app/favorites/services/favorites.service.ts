import { AccountRepository } from "@app/account/repository/account.repo";
import { KEYS } from "@core/keys";
import { inject, injectable } from "inversify";
import { FavoriteEntity, FavoriteRestaurantEntity } from "../domain";
import { FavoriteBaseDto, FavoriteDto, FavoriteInfoDto } from "../dtos/favorite.dto";
import { FavoriteRestaurantDto, InfoFavoriteRestaurantDto } from "../dtos/favoriteRestaurant.dto";
import { FavoriteRepository } from "../repository/favorite.repo";

@injectable()
export class FavoriteApplicationService {

  // Normally i do not do this, i expose only data that can be access to other service, not all the repo
  constructor(
    @inject(KEYS.FavoriteRepository) private readonly favoriteRepository: FavoriteRepository,
    @inject(KEYS.AccountRepository) private readonly accountRepository: AccountRepository,
    @inject(KEYS.RestaurantRepository) private readonly restaurantRepository: AccountRepository
  ) { }

  async search(userID: string) {
    if (await this.isUserNotExist(userID)) throw new Error("user not found")
    const results = await this.favoriteRepository.searchFavorite(userID)
    const total = results.total
    const favorites = results.favorites.map((favorite) => new FavoriteDto(favorite?.id as string, favorite?.name, favorite?.userID, favorite?.parentID as string, favorite.createdAt as number, favorite?.updatedAt as number, favorite?.favoriteRestaurants as unknown as FavoriteRestaurantEntity))
    return {
      total,
      favorites
    }
  }

  async createNewFavoriteCollection(collectionName: string, userID: string) {
    if (await this.isUserNotExist(userID)) throw new Error("user not found")
    const result = await this.favoriteRepository.save({
      name: collectionName,
      userID: userID,
      createdAt: Date.now()
    })
    return new FavoriteInfoDto(result.id as string, result.name, result.userID, result.parentID as string, result.createdAt, result.updatedAt)
  }

  private async isUserNotExist(userID: string): Promise<Boolean> {
    const user = await this.accountRepository.findByID(userID)
    return user === null
  }

  async updateFavoriteCollection(collectionName: string, favoriteID: string, userID: string,) {
    if (await this.isUserNotExist(userID)) throw new Error("user not found")

    const finnedFavorite = await this.favoriteRepository.findByID(favoriteID, userID)
    if (finnedFavorite === null) throw new Error("favorite collection not found")

    const result = await this.favoriteRepository.save({
      id: finnedFavorite.id,
      userID: finnedFavorite.userID,
      createdAt: finnedFavorite.createdAt,
      name: collectionName,
    })
    return new FavoriteInfoDto(result.id as string, result.name, result.userID, result.parentID as string, result.createdAt, result.updatedAt)
  }

  async deleteFavoriteCollection(favoriteID: string, userID: string) {
    if (await this.isUserNotExist(userID)) throw new Error("user not found")
    const result = await this.favoriteRepository.deleteFavorite(favoriteID, userID)

    const finnedFavorite = await this.favoriteRepository.findByID(favoriteID, userID)
    if (finnedFavorite === null) throw new Error("favorite collection not found")

    return {
      effected: result.affected
    }
  }

  async attachRestaurantToFavoriteCollection(restaurantID: string, favoriteID: string, userID: string) {

    if (await this.isUserNotExist(userID)) throw new Error("user not found")

    const finnedFavorite = await this.favoriteRepository.findByID(favoriteID, userID)
    if (finnedFavorite === null) throw new Error("favorite collection not found")

    const favoriteRestaurant = new FavoriteRestaurantEntity()
    favoriteRestaurant.adderID = userID
    favoriteRestaurant.favoriteID = finnedFavorite.id as string
    favoriteRestaurant.restaurantID = restaurantID

    const result = await this.favoriteRepository.addRestaurantToFavorite(favoriteRestaurant, userID)
    return new FavoriteRestaurantDto(result.id, result.createdAt as number, result.adderID, result.favoriteID, result.restaurantID)
  }

  async detachRestaurantToFavoriteCollection(favoriteRestaurantID: string, favoriteID: string, userID: string) {
    if (await this.isUserNotExist(userID)) throw new Error("user not found")

    const finnedFavorite = await this.favoriteRepository.findByID(favoriteID, userID)
    if (finnedFavorite === null) throw new Error("favorite collection not found")

    const favoriteRestaurant = new FavoriteRestaurantEntity()
    favoriteRestaurant.restaurantID = favoriteRestaurantID
    favoriteRestaurant.favoriteID = favoriteID


    return this.favoriteRepository.removeRestaurantFromFavorite(favoriteRestaurant, userID)

  }

  async infoRestaurantInFavorite(favoriteID: string, userID: string) {
    const result = await this.favoriteRepository.infoSearchRestaurantInFavorite(favoriteID, userID)
    const favorite = result.favorite as FavoriteEntity
    return new InfoFavoriteRestaurantDto(favorite?.id as string, favorite?.name, favorite?.userID, favorite?.parentID as string, favorite.createdAt as number, favorite?.updatedAt as number, favorite?.favoriteRestaurants as FavoriteRestaurantEntity[])
  }
}