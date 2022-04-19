import { AsyncContainerModule, interfaces } from "inversify";
import { DataSource, Db } from "typeorm";
import createPostgresDB from '@infrastructure/db/postgres'
import config from '@config/main'
import { KEYS } from "@core/keys";
import { IEntitiesDB } from "@shared/types/entitiesDB";
import { AccountEntity, AccountSocialEntity } from "@app/account/domain";
import { FavoriteEntity, FavoriteRestaurantEntity } from "@app/favorites/domain";
import { RestaurantEntity, RestaurantOpenTimeEntity } from "@app/restaurant/domain";
import { IDataMapper } from "@core/domain/IDataMapper";
import { AccountDataMapper } from "@app/account/mappers/account.mapper";
import { AccountRepository } from "@app/account/repository/account.repo";
import { AccountSocialRepository } from "@app/account/repository/accountSocial.repo";
import { PushNotificationEntity } from "@app/notifier/domain/notifierPushNotificationDomain";
import { AccountSocialDataMapper } from "@app/account/mappers/accountSocial.mapper";
import { RestaurantRepository } from "@app/restaurant/repository/restaurant.repo";
import { RestaurantDataMapper } from "@app/restaurant/mappers/restaurant.mapper";
import { RestaurantOpenTimeDataMapper } from "@app/restaurant/mappers/restaurantOpenTime.mapper";

export const infrastructureContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {

  // setup database
  const entities: IEntitiesDB = [
    AccountEntity,
    AccountSocialEntity,
    FavoriteEntity,
    FavoriteRestaurantEntity,
    RestaurantEntity,
    RestaurantOpenTimeEntity,
    PushNotificationEntity
  ]

  const DB: DataSource = createPostgresDB({
    database: config.POSTGRES_DB_DATABASE_NAME,
    host: config.POSTGRES_DB_HOST,
    password: config.POSTGRES_DB_PASSWORD,
    port: config.POSTGRES_DB_PORT as number,
    username: config.POSTGRES_DB_USERNAME
  }, entities);

  // binding DB
  bind<DataSource>(KEYS.PostgresDB).toConstantValue(DB)

  // binding DATA MAPPER
  bind<IDataMapper<AccountEntity>>(KEYS.AccountDataMapper).to(AccountDataMapper);
  bind<IDataMapper<AccountSocialEntity>>(KEYS.AccountSocialDataMapper).to(AccountSocialDataMapper);
  bind<IDataMapper<RestaurantEntity>>(KEYS.RestaurantDataMapper).to(RestaurantDataMapper)
  bind<IDataMapper<RestaurantOpenTimeEntity>>(KEYS.RestaurantOpenTimeDataMapper).to(RestaurantOpenTimeDataMapper)

  // Bind Repo
  bind<AccountRepository>(KEYS.AccountRepository).to(AccountRepository);
  bind<AccountSocialRepository>(KEYS.AccountSocialRepository).to(AccountSocialRepository);
  bind<RestaurantRepository>(KEYS.RestaurantRepository).to(RestaurantRepository)

  // INITIALIZE DATABASE
  DB.initialize()

  // migrate here
})