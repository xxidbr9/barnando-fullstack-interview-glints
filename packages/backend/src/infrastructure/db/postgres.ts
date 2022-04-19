import "reflect-metadata"
import { DataSource,  } from "typeorm"
import { IEntitiesDB } from "@shared/types/entitiesDB"


type IDBConnectionOptions = {
  host: string
  port: number
  username: string
  password: string
  database: string
}

const createPostgresDB = (opts: IDBConnectionOptions, entities: IEntitiesDB) => {
  return new DataSource({
    type: "postgres",
    synchronize: true,
    logging: true,
    // Config
    host: opts.host,
    port: opts.port,
    username: opts.username,
    password: opts.password,
    database: opts.database,
    entities: entities,
  })
}


export default createPostgresDB
