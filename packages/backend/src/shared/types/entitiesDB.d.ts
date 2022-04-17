import { EntitySchema, MixedList } from "typeorm";

export type IEntitiesDB = MixedList<string | Function | EntitySchema<any>>
