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

export const infrastructureContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {

  // setup database
  const entities: IEntitiesDB = [
    AccountEntity,
    AccountSocialEntity,
    FavoriteEntity,
    FavoriteRestaurantEntity,
    RestaurantEntity,
    RestaurantOpenTimeEntity
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

  // Bind Repo
  bind<AccountRepository>(KEYS.AccountRepository).to(AccountRepository);

  // INITIALIZE DATABASE
  DB.initialize()
})