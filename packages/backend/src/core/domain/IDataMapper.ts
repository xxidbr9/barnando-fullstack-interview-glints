export interface IDataMapper<T> {
  toDomain(dalEntity: T): T;
  toDalEntity(entity: T): T;
}
