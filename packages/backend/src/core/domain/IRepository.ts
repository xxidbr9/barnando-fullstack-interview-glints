export interface IRepository<T> {
  isExists(id: string): Promise<boolean>;
  save(entity: T): Promise<void>;
}